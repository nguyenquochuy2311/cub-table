import { CONFIG } from '@/configs';
import { ISequelize } from '@/interfaces/database.interface';
import _NodeCache from 'node-cache';
import { ULID } from 'ulidx';

export class NodeCache {
	private static STD_TTL = 10000;
	private static TTL = 10000;

	private static CONNECTION_BRANCH = 'CONNECTIONS';
	private static SERVICE_BRANCH = 'SERVICES';
	private static REPOSITORY_BRANCH = 'REPOSITORIES';

	private static nodeCache = new _NodeCache({
		stdTTL: NodeCache.STD_TTL,
		useClones: false,
	});

	/**
	 * @param {string} dbName
	 * @return {string}
	 */
	private static buildConnectionKey(dbName: string): string {
		return `${this.CONNECTION_BRANCH}:${dbName}`;
	}

	/**
	 * @param {string} workspaceID
	 * @param {ULID} userID
	 * @param {string} serviceName
	 * @return {string}
	 */
	private static buildServiceKey(workspaceID: string, userID?: ULID, serviceName?: string): string {
		return `${workspaceID}:${this.SERVICE_BRANCH}${userID ? `:${userID}` : ''}${serviceName ? `:${serviceName}` : ''}`;
	}

	/**
	 * @param {string} workspaceID
	 * @param {string} repoName
	 * @return {string}
	 */
	private static buildRepoKey(workspaceID: string, repoName: string): string {
		return `${workspaceID}:${this.REPOSITORY_BRANCH}:${repoName}`;
	}

	/**
	 * @param {string} dbName
	 * @param {ISequelize} connection
	 * @param {number=} ttl
	 * @return {any}
	 */
	public static setConnection(dbName: string, connection: ISequelize, ttl = NodeCache.TTL): any {
		const key = this.buildConnectionKey(dbName);

		return this.nodeCache.set(key, connection, ttl);
	}

	/**
	 * @param {string} dbName
	 * @return {any}
	 */
	public static getConnection(dbName: string): any {
		return this.nodeCache.get(this.buildConnectionKey(dbName));
	}

	/**
	 * @param {string} dbName
	 * @return {any}
	 */
	public static delConnection(dbName: string): any {
		const key = `${this.buildConnectionKey(dbName)}*`;

		this.nodeCache.del(key);

		const workspaceID = dbName.replace(`${CONFIG.DB_NAME}_`, '');

		return this.nodeCache.del(`${workspaceID}*`);
	}

	/**
	 * @param {string} workspaceID
	 * @param {Function} serviceFn
	 * @param {ULID} userID
	 * @param {number} ttl?
	 * @return {any}
	 */
	public static setService(workspaceID: string, serviceFn: Function, userID?: ULID): any {
		const key = this.buildServiceKey(workspaceID, userID, serviceFn.constructor.name);

		return this.nodeCache.set(key, serviceFn, NodeCache.TTL);
	}

	/**
	 * @param {string} workspaceID
	 * @param {Function} serviceFn
	 * @param {ULID} userID
	 * @return {any}
	 */
	public static getService(workspaceID: string, serviceFn: Function, userID?: ULID): any {
		return this.nodeCache.get(this.buildServiceKey(workspaceID, userID, serviceFn.name));
	}

	/**
	 * @param {string} workspaceID
	 * @param {ULID[]} userID
	 * @return {any}
	 */
	public static delService(workspaceID: string, userID?: ULID): any {
		const key = userID ? `${this.buildServiceKey(workspaceID, userID)}*` : `${workspaceID}*`;

		return this.nodeCache.del(key);
	}

	/**
	 * @param {string} workspaceID
	 * @param {Function} repoFn
	 * @param {number} ttl?
	 * @return {any}
	 */
	public static setRepo(workspaceID: string, repoFn: Function, ttl: number = NodeCache.TTL): any {
		const key = this.buildRepoKey(workspaceID, repoFn.constructor.name);

		return ttl ? this.nodeCache.set(key, repoFn, ttl) : this.nodeCache.set(key, repoFn);
	}

	/**
	 * @param {string} workspaceID
	 * @param {Function} repoFn
	 * @return {any}
	 */
	public static getRepo(workspaceID: string, repoFn: Function): any {
		return this.nodeCache.get(this.buildRepoKey(workspaceID, repoFn.name));
	}
}
