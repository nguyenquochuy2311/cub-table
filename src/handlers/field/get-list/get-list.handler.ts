import { TableException } from '@/exceptions/table.exception';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldRepository } from '@/repositories/field.repository';
import { FieldGetListInputType } from './get-list.input';
import { FieldGetListOutputType } from './get-list.output';

export class FieldGetListHandler extends HandlerImpl<FieldGetListInputType, FieldGetListOutputType> {
	private _fieldRepository: FieldRepository;

	/**
	 * Creates an instance of FieldGetListHandler.
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		super(locals);

		this._fieldRepository = new FieldRepository(locals.workspaceID);
	}

	/**
	 * Get list of fields
	 *
	 * @param {FieldGetListInputType} input
	 * @returns {Promise<FieldGetListOutputType>}
	 */
	async execute(input: FieldGetListInputType): Promise<FieldGetListOutputType> {
		const { tableID, fieldIDs } = input;

		const fields = await this._fieldRepository.getAll({ tableID, ...(fieldIDs?.length ? { id: fieldIDs } : {}) });
		if (!fields.length) throw TableException.tableNotFound();

		return fields;
	}
}
