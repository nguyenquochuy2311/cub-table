// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as customFormula from '@/utils/custom-formula';
import * as formulajs from '@formulajs/formulajs';
import ivm, { Context, Isolate, IsolateOptions } from 'isolated-vm';
import _ from 'lodash';

export type IVM = { context: ivm.Context; global: ivm.Reference<Record<string | number | symbol, any>> };

export class IVMHelper {
	private static vmOptions: IsolateOptions = { memoryLimit: 32 };
	private static context = {
		dateFormat: 'L',
		timezone: 'Asia/Saigon',
		...formulajs,
		...customFormula,
	};

	private static vm: Isolate;

	/**
	 * @public
	 * @static
	 * @returns {Isolate}
	 */
	public static initVM(): ivm.Isolate {
		if (!IVMHelper.vm || IVMHelper.vm.isDisposed) {
			IVMHelper.vm = new ivm.Isolate(IVMHelper.vmOptions);
		}

		return IVMHelper.vm;
	}

	/**
	 * Description placeholder
	 *
	 * @public
	 * @static
	 * @returns {IVM}
	 */
	public static createIsolate(): IVM {
		const isolateContext = IVMHelper.initVM().createContextSync();
		const jail = isolateContext.global;

		jail.setSync('global', jail.derefInto());

		_.forEach(IVMHelper.context, (fnDeclaration, fnName) => {
			if (typeof fnDeclaration !== 'function') {
				return;
			}

			jail.setSync(fnName, fnDeclaration.bind(IVMHelper.context));
		});

		return { context: isolateContext, global: jail };
	}

	/**
	 * @public
	 * @static
	 * @param {string} formula
	 * @param {IVM} ivm
	 * @param {extraFunction} extraFunction
	 * @returns {void}
	 */
	public static runIsolate(formula: string, ivm: IVM, extraFunction?: string[]): any {
		const { context, global } = ivm;
		// Set extra function needed before run
		_.forEach(extraFunction, fnName => {
			if (formulajs[fnName] && typeof formulajs[fnName] === 'function') {
				global.setSync(fnName, formulajs[fnName].bind({ ...IVMHelper.context, ...formulajs }));
			}
			if (customFormula[fnName] && typeof customFormula[fnName] === 'function') {
				global.setSync(fnName, customFormula[fnName].bind(IVMHelper.context));
			}
		});
		return context.evalSync(formula, { timeout: 500, copy: true });
	}

	/**
	 * @public
	 * @static
	 * @param {Context} context
	 * @returns {Context}
	 */
	public static releaseIsolate(context: Context): void {
		return context.release();
	}
}
