import { TableCreateInputValidator } from '@/handlers/table/create/create.input';
import { TableDeleteInputValidator } from '@/handlers/table/delete/delete.input';
import { TableHandler } from '@/handlers/table/handler';
import { IContext } from '@/interfaces/moleculer.interface';
import { ServiceActionsSchema } from 'moleculer';

export const TableActions: ServiceActionsSchema = {
	'table.create': {
		rest: 'POST /table/create',
		params: TableCreateInputValidator,
		handler: (ctx: IContext) => TableHandler.getInstance(ctx).create(),
	},

	'table.delete': {
		rest: 'DELETE /table/delete/:tableID',
		params: TableDeleteInputValidator,
		handler: (ctx: IContext) => TableHandler.getInstance(ctx).delete(),
	},
};
