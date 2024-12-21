import { RecordBulkCreateInputValidator } from '@/handlers/record/bulk-create/bulk-create.input';
import { RecordBulkDeleteInputValidator } from '@/handlers/record/bulk-delete/bulk-delete.input';
import { RecordGetListInputValidator } from '@/handlers/record/get-list/get-list.input';
import { RecordHandler } from '@/handlers/record/handler';
import { IContext } from '@/interfaces/moleculer.interface';
import { ServiceActionsSchema } from 'moleculer';

export const RecordActions: ServiceActionsSchema = {
	'record.get-list': {
		rest: 'POST /record/list/:tableID',
		params: RecordGetListInputValidator,
		handler: (ctx: IContext) => RecordHandler.getInstance(ctx).getList(),
	},

	// 'record.get-detail': {
	// 	rest: 'GET /record/get-detail/:tableID/:recordID',
	// },

	'record.bulk-create': {
		rest: 'POST /record/bulk-create/:tableID',
		params: RecordBulkCreateInputValidator,
		handler: (ctx: IContext) => RecordHandler.getInstance(ctx).bulkCreate(),
	},

	// 'record.bulk-update': {
	// 	rest: 'PUT /record/bulk-update/:tableID',
	// },

	'record.bulk-delete': {
		rest: 'DELETE /record/bulk-delete/:tableID',
		params: RecordBulkDeleteInputValidator,
		handler: (ctx: IContext) => RecordHandler.getInstance(ctx).bulkDelete(),
	},

	// 'record.bulk-duplicate': {
	// 	rest: 'POST /record/bulk-duplicate/:tableID',
	// },

	// 'record.set-cells': {
	// 	rest: 'PATCH /record/set-cells/:tableID',
	// },
};
