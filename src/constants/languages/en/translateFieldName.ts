import { FieldTypeEnum } from '@/models';

export const translateFieldName = (type: FieldTypeEnum): string => {
	switch (type) {
		case FieldTypeEnum.TEXT:
			return 'Text';

		case FieldTypeEnum.DATE:
			return 'Date';

		case FieldTypeEnum.DROPDOWN:
			return 'Dropdown';

		case FieldTypeEnum.CHECKBOX:
			return 'Checkbox';

		case FieldTypeEnum.PARAGRAPH:
			return 'Paragraph';

		case FieldTypeEnum.ATTACHMENT:
			return 'Attachment';

		case FieldTypeEnum.NUMBER:
			return 'Number';

		case FieldTypeEnum.PHONE:
			return 'Phone';

		case FieldTypeEnum.EMAIL:
			return 'Email';

		case FieldTypeEnum.CURRENCY:
			return 'Currency';

		case FieldTypeEnum.PEOPLE:
			return 'People';

		case FieldTypeEnum.WEBSITE:
			return 'Website';

		case FieldTypeEnum.RATING:
			return 'Rating';

		case FieldTypeEnum.PROGRESS:
			return 'Progress';

		case FieldTypeEnum.FORMULA:
			return 'Formula';

		case FieldTypeEnum.REFERENCE:
			return 'Reference';

		case FieldTypeEnum.LOOKUP:
			return 'Lookup';

		case FieldTypeEnum.CREATED_BY:
			return 'Created by';

		case FieldTypeEnum.LAST_MODIFIED_BY:
			return 'Last modified by';

		case FieldTypeEnum.CREATED_TIME:
			return 'Created at';

		case FieldTypeEnum.LAST_MODIFIED_TIME:
			return 'Updated at';

		default:
			return 'Text';
	}
};
