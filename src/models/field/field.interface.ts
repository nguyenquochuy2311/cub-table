import { _FieldModel, FieldDataType } from 'table-sdk';

export type IFieldModel = _FieldModel.IFieldModel;
export type IFieldData = _FieldModel.IFieldData;

export enum FieldTypeEnum {
	TEXT = FieldDataType.TEXT, // 1
	CHECKBOX = FieldDataType.CHECKBOX, // 2
	PARAGRAPH = FieldDataType.PARAGRAPH, // 3
	ATTACHMENT = FieldDataType.ATTACHMENT, // 4
	DROPDOWN = FieldDataType.DROPDOWN, // 5
	NUMBER = FieldDataType.NUMBER, // 6
	DATE = FieldDataType.DATE, // 7
	PHONE = FieldDataType.PHONE, // 8
	WEBSITE = FieldDataType.WEBSITE, // 9
	EMAIL = FieldDataType.EMAIL, // 10
	CURRENCY = FieldDataType.CURRENCY, // 11
	PEOPLE = FieldDataType.PEOPLE, // 12
	RATING = FieldDataType.RATING, // 13
	PROGRESS = FieldDataType.PROGRESS, // 14
	REFERENCE = FieldDataType.REFERENCE, // 15
	FORMULA = FieldDataType.FORMULA, // 16
	LOOKUP = FieldDataType.LOOKUP, // 18
	LAST_MODIFIED_BY = FieldDataType.LAST_MODIFIED_BY, // 19
	LAST_MODIFIED_TIME = FieldDataType.LAST_MODIFIED_TIME, // 20
	CREATED_BY = FieldDataType.CREATED_BY, // 21
	CREATED_TIME = FieldDataType.CREATED_TIME, // 22
	AUTO_NUMBER = FieldDataType.AUTO_NUMBER,
}
