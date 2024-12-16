import type { Model, Transaction } from 'sequelize';
import type { Repository, Sequelize } from 'sequelize-typescript';

export type ITransaction = Transaction & {
	safeCommit(): Promise<void>;
	safeRollback(): Promise<void>;
};

export type ISequelize = Sequelize & {
	disconnect(): Promise<void>;
	createTransaction(options?: object, callBack?: object): Promise<ITransaction>;
};

export type IRepository<M extends Model> = Repository<M>;
