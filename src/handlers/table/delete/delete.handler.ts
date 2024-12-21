import { TableException } from '@/exceptions/table.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize, ITransaction } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldRepository } from '@/repositories/field.repository';
import { TableRepository } from '@/repositories/table.repository';
import { TableDeleteInputType } from './delete.input';

export class TableDeleteHandler extends HandlerImpl<TableDeleteInputType> {
	private connection: ISequelize;
	private _fieldRepository: FieldRepository;

	/**
	 * Creates an instance of FieldGetListHandler.
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		super(locals);

		this.connection = ConnectionHelper.getConnection(locals.workspaceID);
		this._fieldRepository = new FieldRepository(locals.workspaceID);
	}

	/**
	 * Delete a table
	 *
	 * @param {TableDeleteInputType} input
	 * @returns {Promise<void>}
	 */
	async execute(input: TableDeleteInputType): Promise<void> {
		const { tableID } = input;
		const tableRepository = new TableRepository(this.locals.workspaceID, tableID);

		if (!(await tableRepository.checkTableExisted())) {
			throw TableException.tableNotFound();
		}

		let transaction!: ITransaction;

		try {
			transaction = await this.connection.createTransaction();

			await this._fieldRepository.delete({ tableID }, transaction);
			await tableRepository.dropTable(transaction);

			await transaction.safeCommit();
		} catch (error) {
			await transaction.safeRollback();
			throw error;
		}
	}
}
