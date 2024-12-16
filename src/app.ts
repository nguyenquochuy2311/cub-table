import { CONFIG } from '@/configs';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { IVMHelper } from '@/helpers/ivm.helper';
import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { S3Helper } from '@/helpers/s3.helper';
import { StorageHelper } from '@/helpers/storage.helper';
import moment from 'moment-timezone';

export class App {
	/**
	 * Init dependencies
	 *
	 * @private
	 * @returns {void}
	 */
	private static async _initDependencies(): Promise<void> {
		moment.tz.setDefault(CONFIG.DEFAULT_TIMEZONE_MOMENT);

		IVMHelper.initVM();
		S3Helper.init();

		await StorageHelper.init();
		await ConnectionHelper.ping();
	}

	/**
	 * Init core broker
	 *
	 * @async
	 * @returns {Promise<IServiceBroker>}
	 */
	static async init(): Promise<void> {
		MoleculerHelper.init();

		await this._initDependencies();

		await MoleculerHelper.start();
	}
}
