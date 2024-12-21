import { ServiceHooks } from 'moleculer';

export default {
	before: {
		'*': 'validateMeta',
	},
} as ServiceHooks;
