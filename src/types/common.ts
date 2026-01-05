export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponseMetadata {
  status: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  metadata: ApiResponseMetadata;
  data: T | null;
}
