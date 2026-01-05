import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { createSuccessResponse, createErrorResponse } from '@/lib/api/response';

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);

    return createSuccessResponse({
      data: {
        timestamp: new Date().toISOString(),
        database: 'connected',
      },
      message: 'Server is alive',
      httpStatus: 200,
    });
  } catch (error) {
    console.error('Liveness probe error:', error);
    return createErrorResponse({
      message: error instanceof Error ? error.message : 'Database connection failed',
      status: 'unhealthy',
      httpStatus: 503,
    });
  }
}
