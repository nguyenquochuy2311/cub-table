import { Handler } from '@/helpers/handler.helper';
import { IContext } from '@/interfaces/moleculer.interface';
import { ITableHandler } from '../table.handler';
import { TableCreateHandler } from './create/create.handler';
import { TableDeleteHandler } from './delete/delete.handler';

export class TableHandler extends Handler implements ITableHandler {
	/**
	 * Creates an instance of TableHandler.
	 *
	 * @constructor
	 * @param {IContext} ctx
	 */
	constructor(ctx: IContext) {
		super(ctx);
	}

	/**
	 * Create a table
	 *
	 * @returns {Promise<void>}
	 */
	async create(): Promise<void> {
		return new TableCreateHandler(this.locals).execute(this.params);
	}

	/**
	 * Delete a table
	 *
	 * @returns {Promise<void>}
	 */
	async delete(): Promise<void> {
		return new TableDeleteHandler(this.locals).execute(this.params);
	}
}
