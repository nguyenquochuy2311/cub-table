import { Table } from 'sequelize-typescript';
import { _RecordMetaModel } from 'table-sdk';
import type { IRecordMetaModel } from './record-meta.interface';

@Table({
	modelName: 'recordMeta',
	tableName: 'RecordMetas',
	paranoid: true,
})
export class RecordMetaModel extends _RecordMetaModel.RecordMetaModel implements IRecordMetaModel {}
