import { _RecordDataModel } from 'table-sdk';
import { IRecordMetaModel } from '../record-meta';

export type IRecordDataModel = _RecordDataModel.IRecordDataModel & {
	recordMeta: IRecordMetaModel;
};
