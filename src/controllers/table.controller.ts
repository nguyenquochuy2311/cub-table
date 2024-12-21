import { TABLE_SERVICE_NAME } from '@/constants/resources';
import { ServiceSchema } from 'moleculer';
import { FieldActions } from './actions/field.action';
import { TableActions } from './actions/table.action';
import WorkspaceHook from './hooks/workspace.hook';
import { validateMeta } from './methods/validateMeta.method';
import { RecordActions } from './actions/record.action';

export const TableController: ServiceSchema = {
	name: TABLE_SERVICE_NAME,

	hooks: WorkspaceHook,

	methods: {
		validateMeta,
	},

	actions: {
		...TableActions,
		...FieldActions,
		...RecordActions,
	},
};
