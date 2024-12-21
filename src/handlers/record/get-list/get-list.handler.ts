import { FieldException } from '@/exceptions/field.exception';
import { TableException } from '@/exceptions/table.exception';
import { HandlerImpl } from '@/helpers/handler.helper';
import { ILocals } from '@/interfaces/moleculer.interface';
import { FieldRepository } from '@/repositories/field.repository';
import { RecordDataRepository } from '@/repositories/record-data.repository';
import { TableRepository } from '@/repositories/table.repository';
import { map, omit } from 'lodash';
import { RecordGetListInputType } from './get-list.input';
import { RecordGetListOutputType } from './get-list.output';

export class RecordGetListHandler extends HandlerImpl<RecordGetListInputType, RecordGetListOutputType> {
	/**
	 * Creates an instance of RecordGetListHandler.
	 *
	 * @constructor
	 * @param {ILocals} locals
	 */
	constructor(locals: ILocals) {
		super(locals);
	}

	/**
	 * Get list of records
	 *
	 * @param {RecordGetListInputType} input
	 * @returns {Promise<RecordGetListOutputType>}
	 */
	async execute(input: RecordGetListInputType): Promise<RecordGetListOutputType> {
		const { tableID, fieldIDs, limit, offset } = input;

		const [isTableExist, fields] = await Promise.all([
			new TableRepository(this.locals.workspaceID, tableID).checkTableExisted(),
			new FieldRepository(this.locals.workspaceID).getAll({ tableID, id: fieldIDs }),
		]);

		if (!isTableExist) throw TableException.tableNotFound();
		if (fields.length !== fieldIDs.length) throw FieldException.fieldInvalid();

		const recordData = await new RecordDataRepository(this.locals.workspaceID, tableID).getAllIncludeMeta({
			attributes: fieldIDs,
			where: {},
			limit,
			offset,
		});

		return map(recordData, _recordData => ({
			..._recordData.recordMeta,
			cells: omit(_recordData, 'recordMeta'),
		}));
	}
}
