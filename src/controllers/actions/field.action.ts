import { FieldCreateInputValidator } from '@/handlers/field/create/create.input';
import { FieldDeleteInputValidator } from '@/handlers/field/delete/delete.input';
import { FieldGetListInputValidator } from '@/handlers/field/get-list/get-list.input';
import { FieldHandler } from '@/handlers/field/handler';
import { IContext } from '@/interfaces/moleculer.interface';
import { ServiceActionsSchema } from 'moleculer';

export const FieldActions: ServiceActionsSchema = {
	'field.get-list': {
		rest: 'POST /field/list/:tableID',
		params: FieldGetListInputValidator,
		handler: (ctx: IContext) => FieldHandler.getInstance(ctx).fieldGetList(),
	},

	'field.create': {
		rest: 'POST /field/create/:tableID',
		params: FieldCreateInputValidator,
		handler: (ctx: IContext) => FieldHandler.getInstance(ctx).fieldCreate(),
	},

	'field.delete': {
		rest: 'DELETE /field/delete/:tableID',
		params: FieldDeleteInputValidator,
		handler: (ctx: IContext) => FieldHandler.getInstance(ctx).fieldDelete(),
	},
};
