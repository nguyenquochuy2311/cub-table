import { FieldCreateOutputType } from './field/create/create.output';
import { FieldGetListOutputType } from './field/get-list/get-list.output';

export interface IFieldHandler {
	fieldGetList(): Promise<FieldGetListOutputType>;
	fieldCreate(): Promise<FieldCreateOutputType>;
	fieldDelete(): Promise<void>;
}
