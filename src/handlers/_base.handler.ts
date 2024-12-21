import { IFieldHandler } from './field.handler';
import { IRecordHandler } from './record.handler';
import { ITableHandler } from './table.handler';

export type _IBaseHandler = IFieldHandler & ITableHandler & IRecordHandler;
