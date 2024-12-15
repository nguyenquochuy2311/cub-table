import type { LanguageEnum } from '@/interfaces/language.interface';
import type { ULID } from 'ulidx';
import type { Context } from 'moleculer';

export type IMeta = {
	workspaceID: string;
	teamIDs: ULID[];
	userID: ULID;
	lang: LanguageEnum;
	tokenID?: ULID;
};
export type ICompensationStore = {
	meta?: string[] | object;
	params?: string[] | object;
	response?: string[] | object;
};

export interface IMetaCompensate {
	compensationStore: ICompensationStore;
}

export type ILocals = {
	requestLvl: number;
	requestID: string;
	workspaceID: string;
	teamIDs: ULID[];
	userID: ULID;
	lang?: LanguageEnum;
}

export type IContext<T = undefined> = Context<T> & {
	meta: IMeta & IMetaCompensate;
	params: T;
	locals: ILocals;
};

export type IContextEvent<T = undefined> = Context<T> & {
	meta: ILocals;
	params: any;
};

