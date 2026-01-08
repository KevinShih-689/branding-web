import { db } from '@/db';
import { skillCategories, profiles, type SkillCategory as DBSkillCategory } from '@/db/schema';
import { eq, asc, getTableColumns } from 'drizzle-orm';

export class SkillCategoriesRepository {
  async findByProfileId(profileId: string): Promise<DBSkillCategory[]> {
    const result = await db
      .select()
      .from(skillCategories)
      .where(eq(skillCategories.profileId, profileId))
      .orderBy(asc(skillCategories.displayOrder));

    return result ?? [];
  }

  async findByProfileSlug(slug: string): Promise<DBSkillCategory[]> {
    const skillCategoriesColumns = getTableColumns(skillCategories);

    const result = await db
      .select(skillCategoriesColumns)
      .from(skillCategories)
      .innerJoin(profiles, eq(skillCategories.profileId, profiles.id))
      .where(eq(profiles.slug, slug))
      .orderBy(asc(skillCategories.displayOrder));

    return result ?? [];
  }
}
