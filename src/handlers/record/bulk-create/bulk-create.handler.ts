import { TableException } from '@/exceptions/table.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ISequelize } from '@/interfaces/database.interface';
import { ILocals } from '@/interfaces/moleculer.interface';
import { IRecordDataModel, IRecordMetaModel } from '@/models';
import { FieldRepository } from '@/repositories/field.repository';
import { RecordDataRepository } from '@/repositories/record-data.repository';
import { RecordMetaRepository } from '@/repositories/record-meta.repository';
import { TableRepository } from '@/repositories/table.repository';
import { reduce } from 'lodash';
import { ulid } from 'ulidx';
import { RecordBulkCreateInputType } from './bulk-create.input';
import { RecordBulkCreateOutputType } from './bulk-create.output';

export class RecordBulkCreateHandler extends HandlerImpl<RecordBulkCreateInputType, RecordBulkCreateOutputType> {
	private connection: ISequelize;
	private _fieldRepository: FieldRepository;

	/**
	 * Creates an instance of RecordBulkCreateHandler.
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
	 * Bulk create records
	 *
	 * @param {RecordBulkCreateInputType} input
	 * @returns {Promise<RecordBulkCreateOutputType>}
	 */
	async execute(input: RecordBulkCreateInputType): Promise<RecordBulkCreateOutputType> {
		const { tableID, records } = input;

		const tableRepository = new TableRepository(this.locals.workspaceID, tableID);

		const [isTableExist, fields] = await Promise.all([tableRepository.checkTableExisted(), this._fieldRepository.getAll({ tableID })]);

		if (!isTableExist || !fields.length) throw TableException.tableNotFound();

		const { recordMeta, recordData } = reduce(
			records,
			(memo, record) => {
				const id = ulid();

				memo.recordMeta.push({
					id,
					tableID,
					name: 'record-name',
					createdBy: this.locals.userID,
				} as IRecordMetaModel);

				memo.recordData.push({ id, ...record.cells });

				return memo;
			},
			{
				recordMeta: [] as Partial<IRecordMetaModel>[],
				recordData: [] as Partial<IRecordDataModel>[],
			},
		);

		const transaction = await this.connection.createTransaction();

		try {
			const recordCreated = await new RecordMetaRepository(this.locals.workspaceID).bulkCreate(recordMeta, transaction);

			await new RecordDataRepository(this.locals.workspaceID, tableID).bulkCreate(recordData, transaction);

			await transaction.safeCommit();

			return recordCreated;
		} catch (error) {
			await transaction.safeRollback();

			throw error;
		}
	}
}
