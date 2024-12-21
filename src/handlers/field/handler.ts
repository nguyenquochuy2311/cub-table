import { Handler } from '@/helpers/handler.helper';
import { IContext } from '@/interfaces/moleculer.interface';
import { IFieldHandler } from '../field.handler';
import { FieldCreateHandler } from './create/create.handler';
import { FieldCreateOutputType } from './create/create.output';
import { FieldDeleteHandler } from './delete/delete.handler';
import { FieldGetListHandler } from './get-list/get-list.handler';

export class FieldHandler extends Handler implements IFieldHandler {
	/**
	 * Creates an instance of FieldHandler.
	 *
	 * @constructor
	 * @param {IContext} ctx
	 */
	constructor(ctx: IContext) {
		super(ctx);
	}

	/**
	 * Get field list
	 *
	 * @async
	 * @returns {*}
	 */
	async fieldGetList() {
		return new FieldGetListHandler(this.locals).execute(this.params);
	}

	/**
	 * Create field
	 *
	 * @async
	 * @returns {Promise<FieldCreateOutputType>}
	 */
	async fieldCreate(): Promise<FieldCreateOutputType> {
		return new FieldCreateHandler(this.locals).execute(this.params);
	}

	/**
	 * Delete fields
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async fieldDelete(): Promise<void> {
		return new FieldDeleteHandler(this.locals).execute(this.params);
	}
}
