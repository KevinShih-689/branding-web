import { db } from '@/db';
import { certifications, skillCategories, profiles, type Certification as DBCertification } from '@/db/schema';
import { eq, desc, getTableColumns, and, isNull } from 'drizzle-orm';

export class CertificationsRepository {
  async findByProfileSlug(slug: string): Promise<DBCertification[]> {
    const certificationColumns = getTableColumns(certifications);

    const result = await db
      .select(certificationColumns)
      .from(certifications)
      .innerJoin(skillCategories, eq(certifications.categoryId, skillCategories.id))
      .innerJoin(profiles, eq(skillCategories.profileId, profiles.id))
      .where(and(eq(profiles.slug, slug), isNull(certifications.deletedAt), isNull(skillCategories.deletedAt)))
      .orderBy(desc(certifications.issueDate));

    return result ?? [];
  }
}
