import { ITransaction } from '@/interfaces/database.interface';
import { LanguageEnum } from '@/interfaces/language.interface';
import { ILocals } from '@/interfaces/moleculer.interface';

export type IObject = Record<string | number, any>;

export type IReadOnlyObject = {
	readonly [key: string]: string;
};

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
	[Property in Key]-?: Type[Property];
};

export type IObjectWithTransaction = IObject & {
	transaction: ITransaction;
};

export type IGraph = Map<string, Set<string>>;
export type TwoWayLinkSet = Set<string>;

export type ISharedAccess = {
	workspaceID: string;
	lang: LanguageEnum;
};

export type IUserAccess = ILocals;
