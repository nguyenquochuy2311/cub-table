import { FieldTypeEnum } from '@/models';

export const NATIVE_SORT_FIELD = [
	FieldTypeEnum.DROPDOWN,
	FieldTypeEnum.REFERENCE,
	FieldTypeEnum.PEOPLE,
	FieldTypeEnum.LAST_MODIFIED_BY,
	FieldTypeEnum.FORMULA,
	FieldTypeEnum.PARAGRAPH,
];

export const EXCEPT_LAST_MODIFIED_SOURCE = [
	FieldTypeEnum.LOOKUP,
	FieldTypeEnum.LAST_MODIFIED_BY,
	FieldTypeEnum.LAST_MODIFIED_TIME,
	FieldTypeEnum.CREATED_BY,
	FieldTypeEnum.CREATED_TIME,
] as const;

export const TARGET_LOOKUP_ABLE_FIELDS = [
	FieldTypeEnum.TEXT,
	FieldTypeEnum.CHECKBOX,
	FieldTypeEnum.PARAGRAPH,
	FieldTypeEnum.ATTACHMENT,
	FieldTypeEnum.DROPDOWN,
	FieldTypeEnum.NUMBER,
	FieldTypeEnum.DATE,
	FieldTypeEnum.PHONE,
	FieldTypeEnum.WEBSITE,
	FieldTypeEnum.EMAIL,
	FieldTypeEnum.CURRENCY,
	FieldTypeEnum.PEOPLE,
	FieldTypeEnum.RATING,
	FieldTypeEnum.PROGRESS,
	FieldTypeEnum.REFERENCE,
	FieldTypeEnum.FORMULA,
	FieldTypeEnum.LOOKUP,
	FieldTypeEnum.LAST_MODIFIED_BY,
	FieldTypeEnum.LAST_MODIFIED_TIME,
	FieldTypeEnum.CREATED_BY,
	FieldTypeEnum.CREATED_TIME,
] as const;

export const FIELD_ENABLE_SET_CELL = [
	FieldTypeEnum.REFERENCE,
	FieldTypeEnum.PEOPLE,
	FieldTypeEnum.FORMULA,
	FieldTypeEnum.LOOKUP,
	FieldTypeEnum.CREATED_BY,
	FieldTypeEnum.LAST_MODIFIED_BY,
	FieldTypeEnum.CREATED_TIME,
	FieldTypeEnum.LAST_MODIFIED_TIME,
	FieldTypeEnum.AUTO_NUMBER,
] as const;
