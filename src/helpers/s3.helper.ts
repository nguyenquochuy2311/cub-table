import { CONFIG } from '@/configs';
import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { S3 } from '@aws-sdk/client-s3';

const isLocalStack = CONFIG.USE_LOCAL_STACK === true;

export class S3Helper {
	private static _s3: S3;
	private static BATCH_SIZE = 150;

	/**
	 * Creates an instance of S3Uploader.
	 * @date 4/2/2024 - 3:27:28 PM
	 * @returns {S3} s3
	 *
	 */
	static init() {
		if (isLocalStack) {
			MoleculerHelper.getLogger().info('Using localstack for S3');
		}

		if (!this._s3) {
			this._s3 = new S3(
				isLocalStack
					? {
							endpoint: 'http://localhost:4566',
							region: CONFIG.S3_REGION,
							credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
							forcePathStyle: true,
						}
					: {
							region: CONFIG.S3_REGION,
							credentials: {
								accessKeyId: CONFIG.S3_ACCESS_KEY_ID,
								secretAccessKey: CONFIG.S3_SECRET_ACCESS_KEY,
							},
						},
			);
		}

		MoleculerHelper.getLogger().info('S3 initialized');
	}
}
