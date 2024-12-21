import { TABLE_SERVICE_NAME } from '../resources';

export const FLOW_CHANNEL = {
	CREATE_RECORD: `${TABLE_SERVICE_NAME}.flow.create-record`,
	DELETE_RECORD: `${TABLE_SERVICE_NAME}.flow.delete-record`,
	UPDATE_RECORD: `${TABLE_SERVICE_NAME}.flow.update-record`,
};

export const DEV_HUB_CHANNEL = {
	BASE_ACCESS_REVOKED: 'base.access.revoked',
	BASE_CREATE: 'base.create',
};
