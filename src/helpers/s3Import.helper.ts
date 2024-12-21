import { CONFIG } from '@/configs';
import { TEMP_FOLDER } from '@/constants/resources';
import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { ILocals } from '@/interfaces/moleculer.interface';
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Queue } from 'bullmq';
import _ from 'lodash';
import { Readable } from 'stream';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { batch } from 'stream-json/utils/Batch';
import { monotonicFactory } from 'ulidx';

const isLocalStack = CONFIG.USE_LOCAL_STACK === true;

export class S3Import {
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

	/**
	 * S3 Service get object
	 *
	 * @async
	 * @param {Queue} queue
	 * @param {any} importData
	 * @param {ILocals} locals
	 * @returns {Promise<string>}
	 */
	static async downloadAndQueueForProcess(queue: Queue, importData: any, locals: ILocals): Promise<void> {
		try {
			const { Body } = await this._s3.send(new GetObjectCommand({ Bucket: CONFIG.S3_BUCKET, Key: `${TEMP_FOLDER}/${importData.key}` }));

			if (!(Body instanceof Readable)) {
				throw new Error('Invalid S3 object body');
			}

			const pipeline = chain([Body, parser(), streamArray(), batch({ batchSize: S3Import.BATCH_SIZE })]);

			let totalRecords = 0;
			let chunkIndex = 1;

			const ulid = monotonicFactory();

			for await (const data of pipeline) {
				totalRecords += data.length;

				const jobKey = `${importData.importID}_chunk_${chunkIndex}`;
				const jobData = {
					records: _.map(data, ({ value }) => ({ id: ulid(), ...value })),
					locals,
					chunkIndex,
					...importData,
				};

				await queue.add(jobKey, jobData);

				chunkIndex++;

				MoleculerHelper.getLogger().info(`Queued batch of ${data.length} items for '${importData.importID}'. Total current: ${totalRecords}`);
			}

			await queue.add(`${importData.importID}_chunk_final`, {
				isFinal: true,
				locals,
				...importData,
			});

			MoleculerHelper.getLogger().info(`Queued batch of FINAL for '${importData.importID}'. Grand total: ${totalRecords}`);
		} catch (error) {
			throw error;
		}
	}
}
