import { ITransaction } from '@/interfaces/database.interface';
import { IRecordDataModel, RecordMetaModel } from '@/models';
import { IncludeOptions, WhereOptions } from 'sequelize';
import { TableRepository } from './table.repository';

export type RecordDataQuery = {
	attributes: string[];
	where: WhereOptions<IRecordDataModel>;
	limit: number;
	offset: number;
};

export class RecordDataRepository extends TableRepository {
	/**
	 * Creates an instance of RecordRepository.
	 *
	 * @constructor
	 * @param {string} workspaceID
	 * @param {string} tableID
	 */
	constructor(workspaceID: string, tableID: string) {
		super(workspaceID, tableID);
	}

	/**
	 * Get all records
	 *
	 * @param {RecordDataQuery} queryOpts
	 * @returns {Promise<IRecordDataModel[]>}
	 */
	async getAll(queryOpts: RecordDataQuery): Promise<IRecordDataModel[]> {
		const { attributes, where, limit, offset } = queryOpts;

		return super._getAllByCache('GET_ALL', { attributes, where, limit, offset });
	}

	/**
	 * Get all records include meta
	 *
	 * @param {RecordDataQuery} queryOpts
	 * @returns {Promise<IRecordDataModel[]>}
	 */
	async getAllIncludeMeta(queryOpts: RecordDataQuery): Promise<IRecordDataModel[]> {
		const { attributes, where, limit, offset } = queryOpts;

		const include: IncludeOptions = {
			model: await super._getModel(RecordMetaModel),
			attributes: ['id', 'name', 'createdBy'],
			as: 'recordMeta',
			required: true,
		};

		return super._getAllByCache('GET_ALL_INCLUDE_META', { attributes, where, limit, offset, include });
	}

	/**
	 * Bulk create records
	 *
	 * @async
	 * @param {Partial<IRecordDataModel>[]} data
	 * @param {ITransaction} transaction
	 * @returns {Promise<IRecordDataModel[]>}
	 */
	async bulkCreate(data: Partial<IRecordDataModel>[], transaction: ITransaction): Promise<IRecordDataModel[]> {
		return super._bulkCreateByCache(data, { transaction });
	}

	/**
	 * Delete records
	 *
	 * @async
	 * @param {WhereOptions<IRecordDataModel>} where
	 * @param {ITransaction} transaction
	 * @returns {Promise<void>}
	 */
	async delete(where: WhereOptions<IRecordDataModel>, transaction: ITransaction): Promise<void> {
		await super._deleteByCache({ where, transaction, force: true });
	}
}
