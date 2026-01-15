import { and, isNull, getTableColumns, inArray, eq } from 'drizzle-orm';
import { techTools, skillCategories, profiles, type TechTool as DBTechTool } from '@/db/schema';
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

  async findByProfileSlug(slug: string): Promise<DBTechTool[]> {
    const techToolsColumns = getTableColumns(techTools);

    const result = await db
      .select(techToolsColumns)
      .from(techTools)
      .innerJoin(skillCategories, eq(techTools.categoryId, skillCategories.id))
      .innerJoin(profiles, eq(skillCategories.profileId, profiles.id))
      .where(and(eq(profiles.slug, slug), isNull(techTools.deletedAt), isNull(skillCategories.deletedAt)));

    return result ?? [];
  }
}
