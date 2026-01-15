import { db } from '@/db';
import { experiences, type Experience as DBExperience, type ExperienceDetail as DBExperienceDetail } from '@/db/schema';
import { eq, asc, and, isNull } from 'drizzle-orm';

export class ExperiencesRepository {
  async getExperienceWithDetailsByProfileId(
    profileId: string,
  ): Promise<(DBExperience & { details: DBExperienceDetail[] })[]> {
    return await db.query.experiences.findMany({
      where: and(eq(experiences.profileId, profileId), isNull(experiences.deletedAt)),
      orderBy: [asc(experiences.displayOrder)],
      with: {
        details: {
          orderBy: (details, { asc }) => [asc(details.displayOrder)],
          where: (details, { isNull }) => isNull(details.deletedAt),
        },
      },
    });
  }
}
