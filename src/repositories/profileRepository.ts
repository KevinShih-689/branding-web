import { db } from '@/db';
import { profiles, type Profile as DBProfile } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';

export class ProfileRepository {
  async findBySlug(slug: string): Promise<DBProfile | null> {
    const result = await db.select().from(profiles).where(eq(profiles.slug, slug)).limit(1);

    return result[0] ?? null;
  }

  async findMany(limit: number, offset: number): Promise<DBProfile[]> {
    return db.select().from(profiles).limit(limit).offset(offset).orderBy(desc(profiles.createdAt));
  }

  async count(): Promise<number> {
    const result = await db.select({ value: count() }).from(profiles);

    return result[0]?.value ?? 0;
  }
}
