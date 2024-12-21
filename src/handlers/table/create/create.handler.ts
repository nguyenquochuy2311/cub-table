import { TableException } from '@/exceptions/table.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize, ITransaction } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldTypeEnum } from '@/models';
import { FieldRepository } from '@/repositories/field.repository';
import { TableRepository } from '@/repositories/table.repository';
import { ulid } from 'ulidx';
import { TableCreateInputType } from './create.input';

export class TableCreateHandler extends HandlerImpl<TableCreateInputType> {
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
	 * Create a table
	 *
	 * @param {TableCreateInputType} input
	 * @returns {Promise<void>}
	 */
	async execute(input: TableCreateInputType): Promise<void> {
		const { tableID } = input;
		const tableRepository = new TableRepository(this.locals.workspaceID, tableID);

		if (await tableRepository.checkTableExisted()) {
			throw TableException.tableExisted();
		}

		let transaction!: ITransaction;

		try {
			transaction = await this.connection.createTransaction();

			const field = await this._fieldRepository.create(
				{
					id: ulid(),
					name: 'Text',
					dataType: FieldTypeEnum.TEXT,
					isPrimary: true,
					tableID,
				},
				transaction,
			);

			await tableRepository.createTable(field.id);

			await transaction.safeCommit();
		} catch (error) {
			await transaction.safeRollback();
			throw error;
		}
	}
}
