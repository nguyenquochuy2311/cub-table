export const STATUS_MESSAGE = {
	BAD_REQUEST: 'Bad Request',
	UNAUTHORIZED: 'Unauthorized',
	PERMISSION_DENIED: 'Permission Denied',
	NOT_FOUND: 'Not Found',
	SERVER_ERROR: 'Server Internal Error',

	INVALID_INPUT: 'Invalid Input',

	NAME_EXISTED: 'Values are duplicated',

	WORKSPACE_INVALID: 'Workspace Invalid',

	BASE_NOT_FOUND: 'Base Not Found',
	BOARD_NOT_FOUND: 'Board Not Found',
	CATEGORY_NOT_FOUND: 'Category Not Found',
	VIEW_NOT_FOUND: 'View Not Found',
	FIELD_NOT_FOUND: 'Field Not Found',
	FILTER_NOT_FOUND: 'Filter Not Found',
	RECORD_NOT_FOUND: 'Record Not Found',
	FORM_NOT_FOUND: 'Form Not Found',
	COMMENT_NOT_FOUND: 'Comment Not Found',

	BASE_INVALID: 'Base Invalid',
	BOARD_INVALID: 'Board Invalid',
	VIEW_INVALID: 'ViewID Invalid',
	FIELD_INVALID: 'FieldID Invalid',
	RECORD_INVALID: 'RecordID Invalid',
	FILTER_INVALID: 'Filter Invalid',
	COMMENT_INVALID: 'Comment Invalid',

	GOOGLE_ERROR: 'Google occur error',

	IMPORT_SESSION_DUPLICATED: 'Import Session Duplicated',
	IMPORT_SESSION_NOT_FOUND: 'Import Session Not Found',
	TRANSMIT_DONE: 'Transmit Done',
	IMPORT_FAIL: 'Import Fail',

	SYNC_BOARD_REQUEST_EXPIRED: 'Sync board request expired',
	SYNC_BOARD_REQUEST_PROCESSED: 'Sync board request has been processed',
	SYNC_BOARD_ACCEPT_REQUEST_FAIL: 'Sync board accept request fail',

	BUSINESS_EXCEPTION: 'Business Exception',
} as const;
