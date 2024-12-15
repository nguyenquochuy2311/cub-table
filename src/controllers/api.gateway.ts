import { CONFIG } from '@/configs';
import { QueueHelper } from '@/helpers/queue.helper';
import type { LanguageEnum } from '@/types/language.type';
import type { IContext } from '@/types/moleculer.type';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { map } from 'lodash';
import type { ServiceSchema } from 'moleculer';
import type { IncomingRequest, Route } from 'moleculer-web';
import ApiGatewayService from 'moleculer-web';
import type { ULID } from 'ulidx';

export const makeServerAdapter = () => {
	const serverAdapter = new ExpressAdapter();

	createBullBoard({
		queues: map((QueueHelper as any).QUEUES, queue => new BullMQAdapter(queue)),
		serverAdapter,
	});

	serverAdapter.setBasePath('/queues');

	return serverAdapter;
};

export const BullGatewayController: ServiceSchema = {
	name: 'queues',

	mixins: [ApiGatewayService],

	settings: {
		server: false,
		routes: [
			{
				autoAliases: true,
			},
		],
	},
};

export const ApiGatewayController: ServiceSchema = {
	name: CONFIG.NAMESPACE,

	mixins: [ApiGatewayService],

	settings: {
		port: CONFIG.DEBUG_PORT,

		routes: [
			{
				autoAliases: CONFIG.isDev ? true : false,

				bodyParsers: {
					json: {
						limit: '50mb',
					},
					urlencoded: { extended: false },
				},

				onBeforeCall(ctx: IContext, route: Route, req: IncomingRequest): void {
					if (CONFIG.isDev) {
						const { workspaceid, userid, lang } = req.headers;

						ctx.meta.workspaceID = workspaceid as string;
						ctx.meta.userID = userid as ULID;
						ctx.meta.lang = lang as LanguageEnum;
					}
				},
			},
		],
	},
};
