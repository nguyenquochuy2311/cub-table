import { _IBaseHandler } from '@/handlers/_base.handler';
import { IContext, ILocals } from '@/interfaces/moleculer.interface';

export abstract class Handler {
	/**
	 * Get handler instance
	 *
	 * @static
	 * @param {IContext} ctx
	 * @template {_IBaseHandler} T
	 * @returns {Promise<any>}
	 */
	static getInstance<T extends _IBaseHandler>(ctx: IContext): T {
		return new (this as any)(ctx);
	}

	protected locals: ILocals;
	protected params: any;

	/**
	 * Creates an instance of Handler.
	 *
	 * @constructor
	 * @param {IContext} ctx
	 */
	constructor(ctx: IContext) {
		this.locals = ctx.meta;
		this.params = ctx.params;
	}
}

export abstract class HandlerImpl<Input, Output = void> {
	protected locals: ILocals;

	/**
	 * Creates an instance of HandlerImpl.
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		this.locals = locals;
	}

	abstract execute(input: Input): Promise<Output>;
}
