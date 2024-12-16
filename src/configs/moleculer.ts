import { CONFIG } from '@/configs';
import { Middleware } from '@moleculer/channels';
import { isEmpty } from 'lodash';
import type { BrokerOptions } from 'moleculer';
import { ZodValidator } from 'moleculer-zod-validator';
import moment from 'moment-timezone';
import os from 'os';
import winston from 'winston';

const format = winston.format;
const { combine, timestamp, printf } = format;

const myFormat = printf((data: any) => {
	const level: string = data.level.toUpperCase();

	let message = `${data.timestamp} ${level}: ${data.message}`;

	if (level === 'ERROR') {
		message = `${message}${!isEmpty(data?.stack) ? `\nStack: ${JSON.stringify(data.stack)}` : ''}`;
	}

	return message;
});

const MQ_2_PROTOCOL = CONFIG.MQ_2_PROTOCOL || CONFIG.MQ_PROTOCOL;
const MQ_2_USER = CONFIG.MQ_2_USER || CONFIG.MQ_USER;
const MQ_2_PASSWORD = CONFIG.MQ_2_PASSWORD || CONFIG.MQ_PASSWORD;
const MQ_2_HOST = CONFIG.MQ_2_HOST || CONFIG.MQ_HOST;
const MQ_2_PORT = CONFIG.MQ_2_PORT || CONFIG.MQ_PORT;

export const MOLECULER_CONFIG: BrokerOptions = {
	namespace: CONFIG.NAMESPACE,
	nodeID: `${CONFIG.NODE_NAME}-${os.hostname().toLowerCase()}-${moment().format('YYYY/MM/DD-HH:mm:ss')}`,
	transporter: {
		type: 'AMQP',
		options: {
			url: `${CONFIG.MQ_PROTOCOL}://${CONFIG.MQ_USER}:${CONFIG.MQ_PASSWORD}@${CONFIG.MQ_HOST}:${CONFIG.MQ_PORT}`,
		},
	},
	tracing: {
		enabled: true,
		exporter: {
			type: 'Console',
			options: {
				logger: null,
				colors: true,
				width: 60,
				gaugeWidth: 20,
				stackTrace: true,
			},
		},
	},
	logger: {
		type: 'Winston',
		options: {
			level: CONFIG.LOG_LEVEL || `info`,
			winston: {
				format: combine(timestamp(), myFormat),
				transports: [
					new winston.transports.Console(),
					...(CONFIG.LOG_DIR?.length
						? [new winston.transports.File({ filename: `${CONFIG.LOG_DIR}/${moment().format('YYYY-MM-DD')}.log` })]
						: []),
				],
			},
		},
	},
	validator: new ZodValidator(),
	registry: {
		strategy: 'CpuUsage',
	},
	serializer: 'ProtoBuf',
	skipProcessEventRegistration: true,
	circuitBreaker: {
		enabled: true,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60, // in seconds
		halfOpenTime: 5 * 1000, // in milliseconds
		check: err => err && (err as any).code >= 500,
	},

	middlewares: [
		// @ts-expect-error library require unnecessary default params
		Middleware({
			context: true,
			adapter: {
				type: 'AMQP',
				// @ts-expect-error library require unnecessary default params
				options: {
					amqp: {
						url: `${MQ_2_PROTOCOL}://${MQ_2_USER}:${MQ_2_PASSWORD}@${MQ_2_HOST}:${MQ_2_PORT}`,
						// Options for `Amqplib.connect`
						socketOptions: {},
						// Options for `assertQueue()`
						queueOptions: { durable: true },
						// Options for `assertExchange()`
						exchangeOptions: {},
						// Options for `channel.publish()`
						messageOptions: { persistent: true },
						// Options for `channel.consume()`
						consumerOptions: {},
						// Note: options for `channel.assertExchange()` before first publishing in new exchange
						publishAssertExchange: {
							// Enable/disable calling once `channel.assertExchange()` before first publishing in new exchange by `sendToChannel`
							enabled: true,
							// Options for `channel.assertExchange()` before publishing by `sendToChannel`
							exchangeOptions: {},
						},
					},
					maxInFlight: 1,
					maxRetries: 1,
				},
			},
		}),
	],
};
