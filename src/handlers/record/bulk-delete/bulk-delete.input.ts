import { ZodParams } from 'moleculer-zod-validator';
import { z } from 'zod';

const rawSchema = new ZodParams({
	tableID: z.string().ulid(),
	recordIDs: z.array(z.string().ulid()).min(1).max(20000),
});

export const RecordBulkDeleteInputValidator = rawSchema.schema;
export type RecordBulkDeleteInputType = typeof rawSchema.context;
