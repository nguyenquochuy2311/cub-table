import { config } from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(NODE_ENV);

config({ path: `.env.${NODE_ENV}` });

export const CONFIG = cleanEnv(process.env, {
	NODE_ENV: str({ default: NODE_ENV }),
	NODE_NAME: str({ default: 'TBL_3' }),

	NAMESPACE: str({ default: 'CUBABLE_V3' }),

	LOG_DIR: str({ default: '' }),
	LOG_LEVEL: str({ default: 'info' }),

	DEBUG_PORT: port({ default: 3001 }),

	DB_HOST: str({ default: '127.0.0.1' }),
	DB_PORT: port({ default: 3306 }),
	DB_USER: str({ default: 'root' }),
	DB_PASSWORD: str({ default: 'root' }),
	DB_NAME: str({ default: 'co' }),

	MQ_PROTOCOL: str({ default: 'amqp' }),
	MQ_HOST: str(),
	MQ_PORT: port({ default: 5672 }),
	MQ_USER: str({ default: 'guest' }),
	MQ_PASSWORD: str({ default: 'guest' }),
	MQ_VIRTUAL_PATH: str({ default: '/' }),

	MQ_2_PROTOCOL: str({ default: 'amqp' }),
	MQ_2_HOST: str(),
	MQ_2_PORT: port({ default: 5672 }),
	MQ_2_USER: str({ default: 'guest' }),
	MQ_2_PASSWORD: str({ default: 'guest' }),
	MQ_2_VIRTUAL_PATH: str({ default: '/' }),

	REDIS_HOST: str({ default: '127.0.0.1' }),
	REDIS_PORT: port({ default: 6379 }),

	RECAPTCHA_SECRET_KEY: str({ default: undefined }),

	DEFAULT_TIMEZONE_MOMENT: str({ default: 'Asia/Saigon' }),
	DEFAULT_TIMEZONE_SQL: str({ default: '+07:00' }),

	S3_ACCESS_KEY_ID: str(),
	S3_SECRET_ACCESS_KEY: str(),
	S3_BUCKET: str(),
	S3_REGION: str({ default: 'ap-southeast-1' }),
	USE_LOCAL_STACK: bool({ default: false }),
});
