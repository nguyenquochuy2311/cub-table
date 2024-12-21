import { ZodParams } from 'moleculer-zod-validator';
import { z } from 'zod';

const rawSchema = new ZodParams({
	tableID: z.string().ulid(),
	fieldIDs: z.array(z.string().ulid()).min(0).max(100),
	limit: z.coerce.number().int().min(1).max(1000),
	offset: z.coerce.number().int().min(0).max(1000),
});

export const RecordGetListInputValidator = rawSchema.schema;
export type RecordGetListInputType = typeof rawSchema.context;
