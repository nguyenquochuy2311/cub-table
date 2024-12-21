import { TableException } from '@/exceptions/table.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize, ITransaction } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldRepository } from '@/repositories/field.repository';
import { TableRepository } from '@/repositories/table.repository';
import { FieldCreateInputType } from './create.input';
import { FieldCreateOutputType } from './create.output';

export class FieldCreateHandler extends HandlerImpl<FieldCreateInputType, FieldCreateOutputType> {
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
	 * Create a field
	 *
	 * @param {FieldCreateInputType} input
	 * @returns {Promise<FieldCreateOutputType>}
	 */
	async execute(input: FieldCreateInputType): Promise<FieldCreateOutputType> {
		const tableRepository = new TableRepository(this.locals.workspaceID, input.tableID);

		if (!(await tableRepository.checkTableExisted())) {
			throw TableException.tableNotFound();
		}

		let transaction!: ITransaction;

		try {
			transaction = await this.connection.createTransaction();

			const field = await this._fieldRepository.create(input, transaction);

			await new TableRepository(this.locals.workspaceID, input.tableID).createField(field.id, transaction);

			await transaction.safeCommit();

			return field;
		} catch (error) {
			transaction && (await transaction.safeRollback());
			throw error;
		}
	}
}
