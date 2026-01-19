import { NextRequest } from 'next/server';
import { getAuthenticatedUserId, createSuccessResponse, createErrorResponse, ApiError } from '@/lib/api';
import { container } from '@/lib/api/container';

export async function POST(req: NextRequest) {
  try {
    const userId = getAuthenticatedUserId(req);
    const documentsService = container.documentsService;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return createErrorResponse({
        message: 'No file uploaded',
        status: 'Bad Request',
        httpStatus: 400,
      });
    }

    if (file.type !== 'application/pdf') {
      return createErrorResponse({
        message: 'Only PDF files are allowed',
        status: 'Bad Request',
        httpStatus: 400,
      });
    }

    if (file.size > 10 * 1024 * 1024) {
      return createErrorResponse({
        message: 'File size exceeds 10MB limit',
        status: 'Bad Request',
        httpStatus: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await documentsService.processAndSaveDocument(userId, buffer, file.name);

    return createSuccessResponse({
      data: {
        id: result[0]?.id,
        filename: file.name,
        file_url: null,
        mime_type: file.type,
        size_bytes: file.size,
        chunk_count: result.length,
        created_at: new Date().toISOString(),
      },
      message: 'File uploaded and processed successfully',
      httpStatus: 200,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return createErrorResponse({
        message: error.message,
        status: error.status,
        httpStatus: error.statusCode,
      });
    }

    console.error('Upload Error:', error);
    return createErrorResponse({
      message: 'Failed to process document embeddings',
      status: 'Internal Server Error',
      httpStatus: 500,
    });
  }
}
