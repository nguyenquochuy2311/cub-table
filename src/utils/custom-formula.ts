import { REGEX } from '@/constants/regex';
import type { IObject } from '@/types/_base.type';
import _ from 'lodash';
import type { DurationInputArg2, Moment } from 'moment-timezone';
import moment from 'moment-timezone';

export const CONVERTMONTH = function (days: number) {
	if (!_.isNumber(days)) throw new TypeError('Input invalid');

	return days / 30;
};

export const CONVERTHOUR = function (days: number) {
	if (!_.isNumber(days)) throw new TypeError('Input invalid');

	return days * 24;
};

export const CONVERTMINUTE = function (days: number) {
	if (!_.isNumber(days)) throw new TypeError('Input invalid');

	return days * 24 * 60;
};

export const CONVERTSECOND = function (days: number) {
	if (!_.isNumber(days)) throw new TypeError('Input invalid');

	return days * 24 * 60 * 60;
};

export const CONVERTDATE = function (date: string, from_format: string, to_format: string) {
	if (!_.isString(date) || !_.isString(from_format) || !_.isString(to_format)) throw new TypeError('Input invalid');

	return moment(date, from_format).format(to_format);
};

export const CASE = function (...args: any[]) {
	if (args.length < 3) throw new TypeError('missing arguments');

	const { result, matched, elseResult } = _.reduce(
		args,
		(accumulator: IObject, arg, index) => {
			if (accumulator.matched) {
				if (!('result' in accumulator)) accumulator.result = arg;

				return accumulator;
			}

			// got switch
			if (!index) {
				accumulator.switch = arg;

				return accumulator;
			}

			if (!(index % 2)) {
				accumulator.elseResult = undefined;

				return accumulator;
			}

			// got each value to switch-case
			if (index % 2) {
				if (arg === accumulator.switch) {
					accumulator.matched = true;
				} else if (index >= 3) {
					accumulator.elseResult = arg;
				}

				return accumulator;
			}

			return accumulator;
		},
		{
			matched: undefined,
			switch: undefined,
			elseResult: undefined,
		},
	);

	return matched ? result : elseResult;
};

const isNumeric = (num: any) => (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) && !isNaN(num as number);

const combineArrays = (arrays: any[]) => {
	if (!arrays.every(Array.isArray)) {
		throw new TypeError('Input must be arrays');
	}

	// Find the maximum length of any sub-array
	const maxLength = Math.max(...arrays.map(array => array.length));

	// Handle potential missing values and convert non-numbers to 0
	return arrays.map(array => {
		const newArray = new Array(maxLength).fill(0);

		array.forEach((value, index) => {
			const numericValue = isNumeric(value) ? Number(value) : 0;

			newArray[maxLength - array.length + index] = Number.isFinite(numericValue) ? numericValue : 0;
		});

		return newArray;
	});
};

export const SUMARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) return 0;
	if (arrays.length === 1) {
		return arrays[0].reduce((a: number, b: number) => {
			const numericValue = isNumeric(b) ? Number(b) : 0;

			return Number.isFinite(numericValue) ? a + numericValue : a + 0;
		}, 0);
	}

	const combinedArrays = combineArrays(arrays);

	// Sum the arrays element-wise
	return combinedArrays.reduce((accumulator: number[], currentArray: number[]) => {
		return accumulator.map((value, index) => value + currentArray[index]);
	});
};

export const SUBTRACTARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) return 0;
	if (arrays.length === 1) {
		return arrays[0].reduce((a: number, b: number) => {
			const numericValue = isNumeric(b) ? Number(b) : 0;

			return Number.isFinite(numericValue) ? a - numericValue : a - 0;
		}, 0);
	}

	const combinedArrays = combineArrays(arrays);

	// Subtract the arrays element-wise
	return combinedArrays.reduce((accumulator: number[], currentArray: number[]) => {
		return accumulator.map((value, index) => value - currentArray[index]);
	});
};

export const MULTIPLYARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) throw new TypeError('Expected at least one array, but got zero');
	if (arrays.length === 1) {
		return arrays[0].reduce((a: number, b: number) => {
			const numericValue = isNumeric(b) ? Number(b) : 0;

			return Number.isFinite(numericValue) ? a * numericValue : a * 0;
		});
	}

	const combinedArrays = combineArrays(arrays);

	// Multiply the arrays element-wise
	const multiplyArray = combinedArrays.reduce((accumulator: number[], currentArray: number[]) => {
		return accumulator.map((value, index) => value * currentArray[index]);
	});

	return multiplyArray.every(value => value === 0) ? [] : multiplyArray;
};

export const DIVIDEARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) throw new TypeError('Expected at least one array, but got zero');
	if (arrays.length === 1) {
		return arrays[0].reduce((a: number, b: number) => {
			const numericValue = isNumeric(b) ? Number(b) : 0;

			return Number.isFinite(numericValue) ? a / numericValue : a / 0;
		});
	}

	const combinedArrays = combineArrays(arrays);

	// Divide the arrays element-wise
	const divideArray = combinedArrays.reduce((accumulator: number[], currentArray: number[]) => {
		return accumulator.map((value, index) => value / currentArray[index]);
	});

	return divideArray.some(value => !Number.isFinite(value)) ? Infinity : divideArray;
};

export const AVERAGEARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) throw new TypeError('Expected at least one array, but got zero');
	if (arrays.length === 1) {
		const sum = arrays[0].reduce((a: number, b: number) => {
			const numericValue = isNumeric(b) ? Number(b) : 0;

			return Number.isFinite(numericValue) ? a + numericValue : a + 0;
		}, 0);

		return sum / arrays[0].length;
	}

	const combinedArrays = combineArrays(arrays);

	const sumArray = combinedArrays.reduce((accumulator: number[], currentArray: number[]) => {
		return accumulator.map((value, index) => value + currentArray[index]);
	});

	return sumArray.map(value => value / arrays.length);
};

export const MINARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) throw new TypeError('Expected at least one array, but got zero');
	if (arrays.length === 1) {
		const numericArray = arrays[0].map((value: any) => (isNumeric(value) ? Number(value) : 0));

		return Math.min(...numericArray);
	}

	// Calculate the sum of each array
	const sums = arrays.map(array => array.reduce((accumulator: number, value: number) => accumulator + (Number.isFinite(value) ? value : 0), 0));

	// Find the index of the array with the minimum sum
	const minIndex = sums.indexOf(Math.min(...sums));

	return arrays[minIndex];
};

export const MAXARRAY = function (...arrays: any[]) {
	if (arrays.length === 0) throw new TypeError('Expected at least one array, but got zero');
	if (arrays.length === 1) {
		const numericArray = arrays[0].map((value: any) => (isNumeric(value) ? Number(value) : 0));

		return Math.max(...numericArray);
	}

	// Calculate the sum of each array
	const sums = arrays.map(array => array.reduce((accumulator: number, value: number) => accumulator + (Number.isFinite(value) ? value : 0), 0));

	// Find the index of the array with the maximum sum
	const minIndex = sums.indexOf(Math.max(...sums));

	return arrays[minIndex];
};

export const ISBLANK = function (expression: any) {
	if (_.isUndefined(expression)) throw new TypeError('Missing input');

	return _.isStrictEmpty(expression);
};

export const BLANKVALUE = function (expression: any, defaultValue: any) {
	if (_.isUndefined(expression) || _.isUndefined(defaultValue)) throw new TypeError('Missing input');

	return _.isStrictEmpty(expression) ? defaultValue : expression;
};

export const ISBEGINS = function (text: string, compareText: string) {
	if (!_.isString(text) || !_.isString(compareText)) throw new TypeError('Input can only be string');

	return _.startsWith(`${text}`.toLowerCase(), `${compareText}`.toLowerCase());
};

export const MOMENT = function (date: Date, dateFormat: string, momentValue: Moment) {
	const format = _.isString(date) && !date.match(REGEX.ISO_DATE_PATTERN) ? dateFormat || this.dateFormat : undefined;
	const setTimezone = _.isBoolean(momentValue) ? momentValue : true;
	let m = moment.invalid();

	if (!_.isNil(date) && !_.isFunction(date)) {
		m = moment(date, format);

		if (!m.isValid()) m = moment(date);

		setTimezone && m.isValid() && m.tz(this.timezone);
	}

	return m;
};

export const ISWORKDATE = function (date: Date, format: string) {
	if (_.isUndefined(date) || _.isUndefined(format)) throw new TypeError('Missing input');

	const momentValue = moment.isMoment(date);
	const dayOfWeek = MOMENT.call(this, date, format, momentValue).day();

	// working weekdays from monday - friday
	const workingWeekdays = [0, 1, 1, 1, 1, 1, 0];
	return !!workingWeekdays[dayOfWeek];
};

export const QUARTER = function (date: Date, format: string) {
	if (_.isUndefined(date) || _.isUndefined(format)) throw new TypeError('Missing input');

	const momentValue = moment.isMoment(date);

	return MOMENT.call(this, date, format, momentValue).quarter();
};

export const DATEADD = function (date: Date, value: number, unit: DurationInputArg2) {
	if (_.isUndefined(date) || _.isUndefined(value) || _.isUndefined(unit)) throw new TypeError('Missing input');

	if (!['minute', 'hour', 'day', 'week', 'month', 'year'].includes(unit) || !_.isInteger(value)) throw new TypeError('Invalid input');

	const momentValue = MOMENT.call(this, date);

	return momentValue.add(value, unit).toDate();
};

export const SET_TIMEZONE = function (date: Date, timezone: string | number) {
	if (_.isUndefined(date) || _.isUndefined(timezone)) {
		throw new TypeError('Missing input');
	}

	const dateData = _.isInteger(timezone) ? moment(date).utcOffset((timezone as number) * 60) : moment(date).tz(timezone as string);

	if (!dateData.isValid()) {
		throw new TypeError('Input invalid');
	}

	return dateData.format();
};

export const MINUTE = function (date: Date) {
	if (_.isUndefined(date)) {
		return NaN;
	}

	if (date instanceof Date) {
		return date.getMinutes();
	}

	const dateData = moment.parseZone(date);

	if (!dateData.isValid()) {
		return NaN;
	}

	return dateData.minute();
};

export const HOUR = function (date: Date) {
	if (_.isUndefined(date)) {
		return NaN;
	}

	if (date instanceof Date) {
		return date.getHours();
	}

	const dateData = moment.parseZone(date);

	if (!dateData.isValid()) {
		return NaN;
	}

	return dateData.hour();
};

export const DAY = function (date: Date) {
	if (_.isUndefined(date)) {
		return NaN;
	}

	if (date instanceof Date) {
		return date.getDate();
	}

	const dateData = moment.parseZone(date);

	if (!dateData.isValid()) {
		return NaN;
	}

	return dateData.date();
};

export const MONTH = function (date: Date) {
	if (_.isUndefined(date)) {
		return NaN;
	}

	if (date instanceof Date) {
		return date.getMonth() + 1;
	}

	const dateData = moment.parseZone(date);

	if (!dateData.isValid()) {
		return NaN;
	}

	return dateData.month() + 1;
};

export const YEAR = function (date: Date) {
	if (_.isUndefined(date)) {
		return NaN;
	}

	if (date instanceof Date) {
		return date.getFullYear();
	}

	const dateData = moment.parseZone(date);

	if (!dateData.isValid()) {
		return NaN;
	}

	return dateData.year();
};

const replaceAll = (text: string, oldText: string, newText: string) => {
	const regex = new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

	return text?.replace(regex, newText);
};

export const LET = function (...args: any[]) {
	if (args?.length < 3) throw new TypeError('Expected at least two variables and one calculation');

	const calculation = args.pop();
	if (!calculation) throw new TypeError('Missing calculation');

	const variablePairs = new Map();
	for (let i = 0; i < args.length; i += 2) {
		const key = args[i];
		const value = args[i + 1];
		variablePairs.set(key, value);
	}

	// Replace variables in calculation
	let result = calculation;
	for (const [key, value] of variablePairs.entries()) {
		result = replaceAll(result, key, value);
	}

	return Function(`"use strict";return (${result});`)();
};

export const ARRAYSLICE = function (array: any[], start = 0, end = 0) {
	if (!_.isArray(array)) throw new TypeError('Input must be an array');

	return array.slice(start, end);
};

export const ENCODEURL = function (url: string) {
	if (!_.isString(url)) throw new TypeError('Input must be a string');

	return encodeURIComponent(url);
};
