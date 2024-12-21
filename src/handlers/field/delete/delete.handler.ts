import { FieldException } from '@/exceptions/field.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize, ITransaction } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldRepository } from '@/repositories/field.repository';
import { TableRepository } from '@/repositories/table.repository';
import { FieldDeleteInputType } from './delete.input';

export class FieldDeleteHandler extends HandlerImpl<FieldDeleteInputType> {
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
	 * Get list of fields
	 *
	 * @param {FieldGetListInputType} input
	 * @returns {Promise<FieldGetListOutputType>}
	 */
	async execute(input: FieldDeleteInputType): Promise<void> {
		const { tableID, fieldIDs } = input;

		const fields = await this._fieldRepository.getAll({ tableID, id: fieldIDs });

		if (fields.length !== fieldIDs.length || fields.some(field => field.isPrimary)) {
			throw FieldException.fieldInvalid('Some fields are invalid');
		}

		let transaction!: ITransaction;

		try {
			transaction = await this.connection.createTransaction();

			await this._fieldRepository.delete({ id: fieldIDs }, transaction);
			await new TableRepository(this.locals.workspaceID, tableID).deleteFields(fieldIDs, transaction);

			await transaction.safeCommit();
		} catch (error) {
			await transaction.safeRollback();
			throw error;
		}
	}
}
