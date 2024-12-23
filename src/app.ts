import { CONFIG } from '@/configs';
import { IVMHelper } from '@/helpers/ivm.helper';
import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { S3Helper } from '@/helpers/s3.helper';
import { StorageHelper } from '@/helpers/storage.helper';
import moment from 'moment-timezone';
import { initTableConnection } from 'table-sdk';

export class App {
	/**
	 * Init dependencies
	 *
	 * @returns {void}
	 */
	private static async _initDependencies(): Promise<void> {
		moment.tz.setDefault(CONFIG.DEFAULT_TIMEZONE_MOMENT);

		IVMHelper.initVM();
		S3Helper.init();

		await StorageHelper.init();

		await initTableConnection({
			username: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			port: CONFIG.DB_PORT,
			host: CONFIG.DB_HOST,
		});
	}

	/**
	 * Init table broker
	 *
	 * @returns {Promise<void>}
	 */
	static async init(): Promise<void> {
		MoleculerHelper.init();

		await this._initDependencies();

		await MoleculerHelper.start();
	}
}
