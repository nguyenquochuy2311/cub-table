import { TableException } from '@/exceptions/table.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { TableRepository } from '@/repositories/table.repository';
import { RecordBulkDeleteInputType } from './bulk-delete.input';
import { RecordMetaRepository } from '@/repositories/record-meta.repository';

export class RecordBulkDeleteHandler extends HandlerImpl<RecordBulkDeleteInputType> {
	private connection: ISequelize;

	/**
	 * Creates an instance of RecordBulkCreateHandler.
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		super(locals);

		this.connection = ConnectionHelper.getConnection(locals.workspaceID);
	}

	/**
	 * Bulk delete records
	 *
	 * @param {RecordBulkDeleteInputType} input
	 * @returns {Promise<void>}
	 */
	async execute(input: RecordBulkDeleteInputType): Promise<void> {
		const { tableID, recordIDs } = input;

		const tableRepository = new TableRepository(this.locals.workspaceID, input.tableID);

		if (!(await tableRepository.checkTableExisted())) {
			throw TableException.tableNotFound();
		}

		const transaction = await this.connection.createTransaction();

		try {
			await new RecordMetaRepository(this.locals.workspaceID).delete({ id: recordIDs, tableID }, transaction);

			await transaction.safeCommit();
		} catch (error) {
			await transaction.safeRollback();
			throw error;
		}
	}
}
