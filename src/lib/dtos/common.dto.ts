import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: PaginationSchema,
  });

export type PaginatedResponseType<T> = {
  data: T[];
  pagination: z.infer<typeof PaginationSchema>;
};

export const ApiResponseMetadataSchema = z.object({
  status: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

export type ApiResponseMetadataType = z.infer<typeof ApiResponseMetadataSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    metadata: ApiResponseMetadataSchema,
    data: dataSchema.nullable(),
  });

export type ApiResponse<T = unknown> = {
  metadata: ApiResponseMetadataType;
  data: T | null;
};
