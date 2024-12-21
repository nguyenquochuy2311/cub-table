import { Handler } from '@/helpers/handler.helper';
import { IContext } from '@/interfaces/moleculer.interface';
import { IRecordHandler } from '../record.handler';
import { RecordBulkCreateHandler } from './bulk-create/bulk-create.handler';
import { RecordBulkDeleteHandler } from './bulk-delete/bulk-delete.handler';
import { RecordGetListHandler } from './get-list/get-list.handler';
import { RecordGetListOutputType } from './get-list/get-list.output';

export class RecordHandler extends Handler implements IRecordHandler {
	/**
	 * Creates an instance of RecordHandler.
	 *
	 * @constructor
	 * @param {IContext} ctx
	 */
	constructor(ctx: IContext) {
		super(ctx);
	}

	/**
	 * Get list of records
	 *
	 * @returns {Promise<RecordGetListOutputType>}
	 */
	async getList(): Promise<RecordGetListOutputType> {
		return new RecordGetListHandler(this.locals).execute(this.params);
	}

	/**
	 * Get detail of a record
	 *
	 * @returns {Promise<any>}
	 */
	async getDetail(): Promise<any> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Bulk create records
	 *
	 * @returns {Promise<any>}
	 */
	async bulkCreate(): Promise<any> {
		return new RecordBulkCreateHandler(this.locals).execute(this.params);
	}

	/**
	 * Bulk update records
	 *
	 * @returns {Promise<any>}
	 */
	async bulkUpdate(): Promise<any> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Bulk delete records
	 *
	 * @returns {Promise<void>}
	 */
	async bulkDelete(): Promise<void> {
		return new RecordBulkDeleteHandler(this.locals).execute(this.params);
	}

	/**
	 * Bulk duplicate records
	 *
	 * @returns {Promise<void>}
	 */
	async bulkDuplicate(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Set cells of a record
	 *
	 * @returns {Promise<void>}
	 */
	async setCells(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
