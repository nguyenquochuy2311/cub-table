export const REGEX = {
	SPECIAL_CHAR: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,

	EMAIL: /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	WEBSITE: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}(\/.*)?/,
	PHONE: /^[0-9()\-+ ]*$/,

	FORMULA_STRING: /["'`](?:(?<=")[^"\\]*(?:\\.[^"\\]*)*"|(?<=')[^'\\]*(?:\\.[^'\\]*)*'|[^`]*`)/,
	FORMULA_FIELD_ID: /#{(field_[A-Z0-9]+)}/,

	ISO_DATE_PATTERN: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,

	MOMENT_FORMULA: /\b(SET_TIMEZONE|QUARTER|ISWORKDATE)\b/,
} as const;

export const DYNAMIC_TAG_REGEX = /(?<=#\{).+?(?=\})/gi;
export const FIELD_ID_REGEX = /_|\|/;
