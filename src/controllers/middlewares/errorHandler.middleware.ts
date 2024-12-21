import pick from 'lodash/pick';
import { Errors } from 'moleculer';

export const errorHandler = (error: Errors.MoleculerError, info: any) => {
	if (info?.service?.metadata['$category'] === 'gateway') throw error;

	const context = pick(
		info.ctx,
		'nodeID',
		'id',
		'event',
		'eventName',
		'eventType',
		'eventGroups',
		'parentID',
		'requestID',
		'caller',
		'params',
		'meta',
		'locals',
	);

	const action = pick(info.action, 'rawName', 'name', 'rest');
	const msg = error.message;
	const trace = error.stack;
	const data = [
		'errorHandler:',
		msg,
		'\n\n--- CONTEXT ---\n',
		context,
		'\n\n--- ACTION ---\n',
		action,
		'\n\n--- TRACE ---\n',
		trace,
		'\n\n --- END ---\n',
	];

	(info?.service?.logger || console).error(...data);

	throw error;
};
