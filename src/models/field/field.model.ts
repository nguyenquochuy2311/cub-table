import { Table } from 'sequelize-typescript';
import { _FieldModel } from 'table-sdk';
import type { IFieldModel } from './field.interface';

@Table({
	modelName: 'field',
	tableName: 'Fields',
	paranoid: true,
})
export class FieldModel extends _FieldModel.FieldModel implements IFieldModel {}
