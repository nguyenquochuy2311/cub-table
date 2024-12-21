import { Context, Service, ServiceBroker, ServiceSchema } from 'moleculer';
import { ULID } from 'ulidx';
import { LanguageEnum } from './language.interface';

export interface IServiceBroker extends ServiceBroker {
	start(): Promise<void>;
	loadServices(folder: string, fileMask?: string): number;
	createService(schema: ServiceSchema): Service;
}
export interface IMeta {
	workspaceID: string;
	teamIDs: ULID[];
	userID: ULID;
	lang: LanguageEnum;
	tokenID?: ULID;
}

export interface ICompensationStore {
	meta?: string[] | Object;
	params?: string[] | Object;
	response?: string[] | Object;
}

export interface IMetaCompensate {
	compensationStore: ICompensationStore;
}

export interface ILocals {
	workspaceID: string;
	teamIDs: ULID[];
	userID: ULID;
	lang?: LanguageEnum;
	tokenID?: ULID;
}

export interface IContext<T = undefined> extends Context<T> {
	meta: IMeta & IMetaCompensate;
	params: any;
	locals: ILocals;
}

export interface IContextEvent<T = undefined> extends Context<T> {
	meta: ILocals;
	params: any;
}
