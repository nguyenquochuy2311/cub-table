import { IObject, IReadOnlyObject } from '@/types/_base.type';
import { translateFieldName } from './translateFieldName';

/**
 * @param {IObject} params
 * @return {IReadOnlyObject}
 */
module.exports = function (params: IObject = {}): IReadOnlyObject {
	const { fieldType } = params;

	const fieldName = translateFieldName(fieldType);
	return {
		fieldName,
		mainViewName: 'Dữ liệu',
	};
};
