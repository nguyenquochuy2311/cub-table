export const STATUS_KEY = {
	BAD_REQUEST: 'BAD_REQUEST',
	UNAUTHORIZED: 'UNAUTHORIZED',
	PERMISSION_DENIED: 'PERMISSION_DENIED',
	NOT_FOUND: 'NOT_FOUND',
	SERVER_ERROR: 'SERVER_INTERNAL_ERROR',
	INPUT_INVALID: 'INPUT_INVALID',

	// Special case
	FILTER_INVALID: 'FILTER_INVALID',
	IMPORT_CANCEL: 'IMPORT_CANCEL',
	SYNC_BOARD_REQUEST_EXPIRED: 'SYNC_BOARD_REQUEST_EXPIRED',
	SYNC_BOARD_REQUEST_PROCESSED: 'SYNC_BOARD_REQUEST_PROCESSED',
	SYNC_BOARD_ACCEPT_REQUEST_FAIL: 'SYNC_BOARD_ACCEPT_REQUEST_FAIL',
	BUSINESS_EXCEPTION: 'BUSINESS_EXCEPTION',
} as const;
