import { CONFIG } from '@/configs';
import { MOLECULER_CONFIG } from '@/configs/moleculer';
import { ApiGatewayController, BullGatewayController, makeServerAdapter } from '@/controllers/api.gateway';
import type { IObject } from '@/types/_base.type';
import type { ILocals } from '@/types/moleculer.type';
import type { LoggerInstance } from 'moleculer';
import { ServiceBroker } from 'moleculer';

export class MoleculerHelper {
	private static BROKER: ServiceBroker;

	/**
	 * Init core broker
	 *
	 * @static
	 * @returns {IServiceBroker}
	 */
	static init(): void {
		MoleculerHelper.BROKER = new ServiceBroker(MOLECULER_CONFIG);

		// MoleculerHelper.BROKER.createService(CoreController);

		// dev
		if (CONFIG.NODE_ENV === 'development') {
			MoleculerHelper.BROKER.createService(ApiGatewayController);

			const bullGateway = MoleculerHelper.BROKER.createService(BullGatewayController);
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const express = require('express')();

			express.use('/', bullGateway.express());
			express.use('/queues', makeServerAdapter().getRouter());
			express.listen(+CONFIG.DEBUG_PORT + 1000);
		}
	}

	/**
	 * @returns {Promise<void>}
	 */
	static async start(): Promise<void> {
		await MoleculerHelper.BROKER.start();
	}

	/**
	 * @returns {Promise<void>}
	 */
	static async stop(): Promise<void> {
		await MoleculerHelper.BROKER.stop();
		MoleculerHelper.BROKER = undefined as any;
	}

	/**
	 * @returns {LoggerInstance}
	 */
	static getLogger(): LoggerInstance {
		return MoleculerHelper.BROKER.logger;
	}

	/**
	 * @param {string} actionName
	 * @param {?*} [params]
	 * @param {?*} [opts]
	 * @returns {Promise<any>}
	 */
	static call(actionName: string, params?: any, opts?: any): Promise<any> {
		return MoleculerHelper.BROKER.call(actionName, params, opts);
	}

	/**
	 * @param {string} eventName
	 * @param {?*} [params]
	 * @param {?*} [opts]
	 * @returns {Promise<any>}
	 */
	static emit(eventName: string, params: any, opts?: any): any {
		return MoleculerHelper.BROKER.emit(eventName, params, opts);
	}

	/**
	 * @param {string} broadcastName
	 * @param {?*} [params]
	 * @param {?*} [opts]
	 * @returns {Promise<any>}
	 */
	static broadcast(broadcastName: string, params?: any, opts?: any): Promise<any> {
		return MoleculerHelper.BROKER.broadcastLocal(broadcastName, params, opts);
	}

	/**
	 * @param {string} channelName
	 * @param {IObject} payload
	 * @param {*} opts
	 * @return {void}
	 */
	static sendToQueue(channelName: string, payload: IObject, opts?: any) {
		return MoleculerHelper.BROKER.sendToChannel(channelName, payload, opts);
	}
}

export class MoleculerLocalHelper {
	private locals: ILocals;

	/**
	 * Creates an instance of MoleculerLocalHelper.
	 * @date 1/4/2024 - 1:31:20 PM
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		this.locals = locals;
	}

	/**
	 * Call service action
	 *
	 * @param {string} actionName
	 * @param {Request} params
	 * @param {any} opts
	 * @returns {Promise<Response>}
	 */
	async call<Request, Response = any>(actionName: string, params: Request, opts = {}): Promise<Response> {
		return MoleculerHelper.call(
			// params
			actionName,
			params,
			{
				meta: this.locals,
				...opts,
			},
		);
	}

	/**
	 * Emit service event
	 *
	 * @param {string} eventName
	 * @param {Request} params
	 * @param {{}} [opts={}]
	 * @returns {Promise<Response>}
	 */
	emit<Request>(eventName: string, params: Request, opts = {}): Promise<void> {
		return MoleculerHelper.emit(
			// params
			eventName,
			params,
			{
				meta: this.locals,
				...opts,
			},
		);
	}

	/**
	 * Send queue channel
	 *
	 * @param {string} channelName
	 * @param {Request} payload
	 * @param {any} opts
	 * @returns {void}
	 */
	sendToQueue<Request>(channelName: string, payload?: Request, opts = {}): void {
		// when send channel, data will recorded with increased level
		const meta = {
			...this.locals,
			...(this.locals.requestLvl ? { requestLvl: this.locals.requestLvl + 1 } : {}),
		};

		return MoleculerHelper.sendToQueue(
			// params
			channelName,
			payload || {},
			{
				ctx: { meta },
				...opts,
			},
		);
	}
}
