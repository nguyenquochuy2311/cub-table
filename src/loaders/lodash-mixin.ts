import _ from 'lodash';

declare module 'lodash' {
	interface LoDashStatic {
		isStrictEmpty(value: any): boolean;
		arrayJoin(arr: any, joinSymbol?: any): string;
	}
}

const lodashMixin = {
	isStrictEmpty(value: any): boolean {
		return _.isNil(value) || _.isEqual(value, {}) || _.isEqual(value, []) || _.isEqual(_.trim(value), '');
	},
	arrayJoin(arr: any, joinSymbol = ', '): string {
		return _(arr)
			.chain()
			.filter(item => !_.isNil(item) && item !== '')
			.join(joinSymbol)
			.value();
	},
};

_.mixin(lodashMixin);

export default _;
