import { CommonException } from '@/exceptions/common.exception';
import { ConnectionHelper } from '@/helpers/connection.helper';
import { DefaultLanguage } from '@/interfaces/language.interface';
import { IContext } from '@/interfaces/moleculer.interface';
import { ULID } from 'ulidx';

/**
 * @param {IContext} ctx
 * @return {void}
 */
export async function validateMeta(ctx: IContext): Promise<void> {
	if (!ctx.meta.workspaceID) {
		throw CommonException.unauthorized();
	}

	await ConnectionHelper.setConnection(ctx.meta.workspaceID);

	ctx.locals = {
		workspaceID: ctx.meta.workspaceID,
		teamIDs: ctx.meta.teamIDs as ULID[],
		userID: ctx.meta.userID as ULID,
		lang: ctx.meta.lang || DefaultLanguage,
		tokenID: ctx.meta?.tokenID,
	};
}
