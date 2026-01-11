import { and, isNull, getTableColumns, inArray } from 'drizzle-orm';
import { techTools, type TechTool as DBTechTool } from '@/db/schema';
import { db } from '@/db';

export class TechToolsRepository {
  async findByCategoryIds(categoryIds: readonly string[]): Promise<DBTechTool[]> {
    const techToolsColumns = getTableColumns(techTools);

    const result = await db
      .select(techToolsColumns)
      .from(techTools)
      .where(and(inArray(techTools.categoryId, categoryIds), isNull(techTools.deletedAt)));

    return result ?? [];
  }
}
