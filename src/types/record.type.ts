import { IFieldData } from '@/models';
import { ULID } from 'ulidx';

export type RecordMappedField = {
	id: ULID;
	cells: Record<ULID, IFieldData>;
};

export type RecordQueryCondition = {
	boardID?: ULID;
	fieldIDs?: ULID[];
	recordIDs?: ULID[];
	notRecordIDs?: ULID[];
	limit?: number;
	offset?: number;
	order?: any;
	notNullFieldIDs?: ULID[];
	paranoid?: boolean;
	includeName?: boolean;
};

export type RecordCacheSearchData = {
	total: number;
	maxChunk: number;
	currentMaxChunk: number;
	recordChunk: Record<number, RecordMappedField>;
};
