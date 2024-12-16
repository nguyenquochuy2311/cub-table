import('@/loaders/lodash-mixin');

import { MoleculerHelper } from '@/helpers/moleculer.helper';
import { App } from './app';
import { CONFIG } from './configs';

(async (): Promise<void> => {
	try {
		await App.init();
	} catch (err) {
		MoleculerHelper.getLogger().error(err);
		await MoleculerHelper.stop();

		process.exit(1);
	}
})();

const gracefulShutdown = async (event: string, exitCode: number = 0, error?: any): Promise<void> => {
	try {
		MoleculerHelper.getLogger().error(`App received ${event} event, try to gracefully close the server`, error);

		await MoleculerHelper.stop();
	} catch {}

	process.exit(exitCode);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

['uncaughtException', 'unhandledRejection'].forEach(event =>
	process.on(event, (error: any) => {
		if (CONFIG.NODE_ENV !== 'production') {
			return gracefulShutdown(event, 1, error);
		}

		switch (true) {
			case error?.name === 'TypeError': {
				MoleculerHelper.getLogger().error(error);
				break;
			}
			default: {
				return gracefulShutdown(event, 1, error);
			}
		}
	}),
);
