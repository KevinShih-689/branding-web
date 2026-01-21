import { NextRequest } from 'next/server';
import {
  getAuthenticatedUserId,
  createSuccessResponse,
  createErrorResponse,
  ApiError,
  validateRequest,
} from '@/lib/api';
import { container } from '@/lib/api/container';
import { UploadDocumentPayloadSchema } from '@/lib/dtos';

export async function POST(req: NextRequest) {
  try {
    const userId = getAuthenticatedUserId(req);

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    const validationResult = UploadDocumentPayloadSchema.safeParse({ file });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      return createErrorResponse({
        message: errorMessage,
        status: 'Bad Request',
        httpStatus: 400,
      });
    }

    const validFile = validationResult.data.file;

    console.log('🚀 ~ POST ~ uploadedFile:', validFile);

    const arrayBuffer = await validFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await container.documentsService.processAndSaveDocument(userId, buffer, validFile.name);

    return createSuccessResponse({
      data: {
        id: result[0]?.id,
        filename: validFile.name,
        file_url: null,
        mime_type: validFile.type,
        size_bytes: validFile.size,
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
