import { ZodParams } from 'moleculer-zod-validator';
import { z } from 'zod';

const rawSchema = new ZodParams({
	tableID: z.string().ulid(),
	records: z
		.array(
			z.object({
				// id: z.string().ulid(),
				cells: z.record(z.string().ulid(), z.any()),
			}),
		)
		.min(1)
		.max(1000),
});

export const RecordBulkCreateInputValidator = rawSchema.schema;
export type RecordBulkCreateInputType = typeof rawSchema.context;
