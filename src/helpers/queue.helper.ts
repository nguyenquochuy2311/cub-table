import type { IObject } from '@/types/_base.type';
import type { Job, JobsOptions, QueueOptions, WorkerOptions } from 'bullmq';
import { Queue, Worker } from 'bullmq';
import { merge } from 'lodash';
import { MoleculerHelper } from './moleculer.helper';
import { StorageHelper } from './storage.helper';

export class QueueHelper {
	private static QUEUES: Record<string, Queue> = {};
	private static WORKERS: Record<string, Worker> = {};

	/**
	 * @param {string} queueName
	 * @param {*} jobConfig
	 * @param {*} workerConfig
	 * @returns {void}
	 */
	static setupWorker(
		queueName: string,
		jobConfig: {
			jobName: string;
			jobData: IObject;
			jobOpts: JobsOptions;
		},
		workerConfig: {
			handler: any;
			workerOpts: WorkerOptions;
		},
	): void {
		if (!QueueHelper.QUEUES[queueName]) QueueHelper._addQueue(queueName);
		if (!QueueHelper.WORKERS[queueName]) QueueHelper._addWorker(queueName, workerConfig.handler, workerConfig.workerOpts);

		QueueHelper.QUEUES[queueName].add(jobConfig.jobName, jobConfig.jobData, {
			removeOnComplete: true,
			removeOnFail: true,
			...(jobConfig.jobOpts || {}),
		});
	}

	/**
	 * @param {string} queueName
	 * @param {QueueOptions} [opts={}]
	 * @returns {*}
	 */
	private static _addQueue(queueName: string, opts?: Partial<QueueOptions>): void {
		const queueOptions = {
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
			streams: {
				events: { maxLen: 100 },
			},
		};

		const mergedOptions = merge({}, queueOptions, opts);

		QueueHelper.QUEUES[queueName] = new Queue(queueName, { ...mergedOptions, connection: StorageHelper.getConfig() });
		QueueHelper.QUEUES[queueName].setGlobalConcurrency(1);
	}

	/**
	 * @param {string} queueName
	 * @param {*} handler
	 * @param {Partial<WorkerOptions>} [opts={}]
	 * @returns {void}
	 */
	private static _addWorker(queueName: string, handler: any, opts: Partial<WorkerOptions> = {}): void {
		const worker = new Worker(queueName, (job: Job) => handler(job), {
			removeOnFail: { count: 0 },
			removeOnComplete: { count: 0 },
			...(opts || {}),
			connection: StorageHelper.getConfig(),
		});

		worker.on('progress', (job: Job) => MoleculerHelper.getLogger().info(`[Worker ${job.name}] progress...`));
		worker.on('completed', (job: Job) => MoleculerHelper.getLogger().info(`[Worker ${job.name}] completed...`));
		worker.on('failed', (job: Job) => MoleculerHelper.getLogger().error(`[Worker ${job?.name}] failed...`, job));
		worker.on('error', (err: any) => MoleculerHelper.getLogger().error(`[Worker ${err.name}] error...`, err));

		QueueHelper.WORKERS[queueName] = worker;
	}
}
