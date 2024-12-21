import { RecordGetListOutputType } from './record/get-list/get-list.output';

export interface IRecordHandler {
	getList(): Promise<RecordGetListOutputType>;
	getDetail(): Promise<any>;
	bulkCreate(): Promise<any>;
	bulkUpdate(): Promise<any>;
	bulkDelete(): Promise<void>;
	bulkDuplicate(): Promise<void>;
	setCells(): Promise<void>;
}
