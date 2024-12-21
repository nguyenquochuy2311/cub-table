import { IFieldModel } from '@/models';
import { IObject } from '@/types/_base.type';
import { ULID } from 'ulidx';
import { ITransaction } from './database.interface';

export interface IFieldFactory<T extends IFieldModel> {
	create(fieldData: Partial<T>, transaction?: ITransaction): Promise<IFieldModel>;

	update(oldFieldData: Readonly<T>, fieldData: T, transaction?: ITransaction): Promise<void>;

	validateCreateData(fieldData: Partial<T>): Partial<T> | Promise<Partial<T>> | any;

	validateUpdateData(oldFieldData: Readonly<T>, fieldData: Partial<T>): Partial<T> | Promise<Partial<T>> | any;

	healingCells?(oldField: Readonly<T>, newField: Partial<T>, transaction?: ITransaction): Promise<void>;
}

export type NativeSearchParams = {
	boardFields: Record<ULID, IFieldModel>;
	filterConditions?: IObject;
	ignoreRecordIDs?: ULID[];
};
