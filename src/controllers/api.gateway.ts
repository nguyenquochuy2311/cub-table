import { CONFIG } from '@/configs';
import { QueueHelper } from '@/helpers/queue.helper';
import { LanguageEnum } from '@/interfaces/language.interface';
import { IContext } from '@/interfaces/moleculer.interface';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import _ from 'lodash';
import { ServiceSchema } from 'moleculer';
import ApiGatewayService, { IncomingRequest, Route } from 'moleculer-web';
import { ULID } from 'ulidx';

export const makeServerAdapter = () => {
	const serverAdapter = new ExpressAdapter();

	createBullBoard({
		queues: _.map(QueueHelper.QUEUES, queue => new BullMQAdapter(queue)),
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
				autoAliases: true,

				onBeforeCall(ctx: IContext, route: Route, req: IncomingRequest): void {
					const { workspaceid, userid, lang } = req.headers;

					ctx.meta.workspaceID = workspaceid as string;
					ctx.meta.userID = userid as ULID;
					ctx.meta.lang = lang as LanguageEnum;
				},
			},
		],
	},
};
