import { CONFIG } from '@/configs';
import { IVMHelper } from '@/helpers/ivm.helper';
import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { S3Import } from '@/helpers/s3Import.helper';
import { Storage } from '@/helpers/storage.helper';
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
		S3Import.init();

		await Storage.init();
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

		// await Connection.getConnection().sync();
		// await BoardSyncHelper.initSchedule();

		await MoleculerHelper.start();
	}
}
