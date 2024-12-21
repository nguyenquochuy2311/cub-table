import { IRepository, ITransaction } from '@/interfaces/database.interface';
import { IRecordMetaModel, RecordMetaModel } from '@/models';
import { WhereOptions } from 'sequelize';
import { RepositoryCache } from './_repo.cache';

export class RecordMetaRepository extends RepositoryCache<IRecordMetaModel> {
	/**
	 * Creates an instance of RecordMetaRepository.
	 *
	 * @constructor
	 * @param {string} workspaceID
	 */
	constructor(workspaceID: string) {
		super(workspaceID);
	}

	/**
	 * Get repository
	 *
	 * @override
	 * @returns {IRepository<RecordMetaModel>}
	 */
	protected override _getRepository(): IRepository<RecordMetaModel> {
		return this.connection.getRepository(RecordMetaModel);
	}

	/**
	 * Bulk create record meta
	 *
	 * @param {Partial<IRecordMetaModel>[]} data
	 * @param {ITransaction} transaction
	 * @returns {Promise<IRecordMetaModel[]>}
	 */
	async bulkCreate(data: Partial<IRecordMetaModel>[], transaction: ITransaction): Promise<IRecordMetaModel[]> {
		return super._bulkCreateByCache(data, {
			transaction,
		});
	}

	/**
	 * Delete record meta
	 *
	 * @param {WhereOptions<IRecordMetaModel>} where
	 * @param {*} transaction
	 * @returns {Promise<void>}
	 */
	async delete(where: WhereOptions<IRecordMetaModel>, transaction: ITransaction): Promise<void> {
		await super._deleteByCache({ where, transaction, force: true });
	}
}
