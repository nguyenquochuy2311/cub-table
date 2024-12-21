import { _RecordMetaModel } from 'table-sdk';
import { IRecordDataModel } from '../record-data';

export type IRecordMetaModel = _RecordMetaModel.IRecordMetaModel & {
	[parseTableID: string]: IRecordDataModel;
};
