import { FieldTypeEnum } from '@/models';

export const translateFieldName = (type: FieldTypeEnum): string => {
	switch (type) {
		case FieldTypeEnum.TEXT:
			return 'Văn bản';

		case FieldTypeEnum.DATE:
			return 'Ngày';

		case FieldTypeEnum.DROPDOWN:
			return 'Tùy chọn';

		case FieldTypeEnum.CHECKBOX:
			return 'Hộp kiểm';

		case FieldTypeEnum.PARAGRAPH:
			return 'Đoạn văn bản';

		case FieldTypeEnum.ATTACHMENT:
			return 'Tập tin';

		case FieldTypeEnum.NUMBER:
			return 'Số';

		case FieldTypeEnum.PHONE:
			return 'Điện thoại';

		case FieldTypeEnum.EMAIL:
			return 'Email';

		case FieldTypeEnum.CURRENCY:
			return 'Tiền tệ';

		case FieldTypeEnum.PEOPLE:
			return 'Nhân sự';

		case FieldTypeEnum.WEBSITE:
			return 'Liên kết';

		case FieldTypeEnum.RATING:
			return 'Đánh giá';

		case FieldTypeEnum.PROGRESS:
			return 'Tiến độ';

		case FieldTypeEnum.FORMULA:
			return 'Công thức';

		case FieldTypeEnum.REFERENCE:
			return 'Tham chiếu';

		case FieldTypeEnum.LOOKUP:
			return 'Tra cứu';

		case FieldTypeEnum.CREATED_BY:
			return 'Tạo bởi';

		case FieldTypeEnum.LAST_MODIFIED_BY:
			return 'Cập nhật lần cuối bởi';

		case FieldTypeEnum.CREATED_TIME:
			return 'Tạo lúc';

		case FieldTypeEnum.LAST_MODIFIED_TIME:
			return 'Cập nhật lần cuối lúc';

		default:
			return 'Văn bản';
	}
};
