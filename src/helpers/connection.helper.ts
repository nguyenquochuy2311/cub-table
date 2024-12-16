import { CONFIG } from '@/configs';
import { Models } from '@/models';
import type { ISequelize, ITransaction } from '@/types/sequelize.type';
import { values } from 'lodash';
import { Sequelize, type SequelizeOptions } from 'sequelize-typescript';
import { initTableConnection } from 'table-sdk';

export class ConnectionHelper {
	private static CONNECTIONS = {} as Record<string, ISequelize>;

	private static DEFAULT_CONFIG: Readonly<SequelizeOptions> = {
		username: CONFIG.DB_USER,
		password: CONFIG.DB_PASSWORD,
		host: CONFIG.DB_HOST,
		port: CONFIG.DB_PORT,
		timezone: CONFIG.DEFAULT_TIMEZONE_SQL,
		dialect: 'mysql',
		define: {
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
		},
		pool: {
			min: 0,
			max: 5,
		},
		dialectOptions: {
			ssl: {
				rejectUnauthorized: true,
			},
		},
		benchmark: false,
		logQueryParameters: false,
		repositoryMode: true,
	};

	/**
	 * @param {string} workspaceID
	 * @returns {ISequelize}
	 */
	static getConnection(workspaceID: string): ISequelize {
		const dbName = `${CONFIG.DB_NAME}_${workspaceID}`;

		const conn = ConnectionHelper.CONNECTIONS[dbName];

		return conn || this._connect(dbName);
	}

	/**
	 * @returns {Promise<void>}
	 */
	static async ping(): Promise<void> {
		await initTableConnection({
			username: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			host: CONFIG.DB_HOST,
			port: CONFIG.DB_PORT,
		});
	}

	/**
	 * @param {string} dbName
	 * @returns {ISequelize}
	 */
	static _connect(dbName: string): ISequelize {
		try {
			const username = ConnectionHelper.DEFAULT_CONFIG.username as string;
			const password = ConnectionHelper.DEFAULT_CONFIG.password as string;

			const conn = new Sequelize(dbName, username, password, ConnectionHelper.DEFAULT_CONFIG) as ISequelize;

			conn.disconnect = async function (): Promise<void> {
				await this.close();

				delete ConnectionHelper.CONNECTIONS[dbName];
			};

			// Declare create transaction fn
			conn.createTransaction = async function (options = undefined, callBack = undefined): Promise<ITransaction> {
				try {
					const transaction = (await this.transaction(options, callBack)) as ITransaction;

					transaction.safeCommit = function (): Promise<void> {
						return this.finished !== 'commit' && this.finished !== 'rollback' && this.commit();
					};

					transaction.safeRollback = function (): Promise<void> {
						return this.finished !== 'commit' && this.finished !== 'rollback' && this.rollback();
					};

					return transaction;
				} catch (error) {
					throw error;
				}
			};

			conn.addModels(values(Models));

			ConnectionHelper.CONNECTIONS[dbName] = conn;

			return conn;
		} catch (error) {
			throw error;
		}
	}
}
