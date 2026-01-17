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

export type PaginatedResponse<T> = {
  data: T[];
  pagination: z.infer<typeof PaginationSchema>;
};

export const ApiResponseMetadataSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export type ApiResponseMetadata = z.infer<typeof ApiResponseMetadataSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    metadata: ApiResponseMetadataSchema,
    data: dataSchema.nullable(),
  });

export type ApiResponse<T = unknown> = {
  metadata: ApiResponseMetadata;
  data: T | null;
};
