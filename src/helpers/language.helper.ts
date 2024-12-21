import { DefaultLanguage, LanguageEnum } from '@/interfaces/language.interface';
import { IObject, IReadOnlyObject } from '@/types/_base.type';
import path from 'path';

class LanguageHelper {
	private lang: LanguageEnum;

	private static translatePath: Readonly<string> = path.join(__dirname, '../constants/languages');

	/**
	 * @param {LanguageEnum} lang
	 */
	constructor(lang: LanguageEnum = DefaultLanguage) {
		this.lang = lang;
	}

	/**
	 * @param {IObject} params
	 * @return {IReadOnlyObject}
	 */
	public getTranslate(params: IObject = {}): IReadOnlyObject {
		return require(`${LanguageHelper.translatePath}/${this.lang}`)(params);
	}
}

export { LanguageHelper };
