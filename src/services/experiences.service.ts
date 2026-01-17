import { ExperiencesRepository } from '@/repositories';
import { ProfileService } from '@/services';
import { toExperienceType } from '@/lib/utils/mappers';
import { type Experience as DBExperience, type ExperienceDetail as DBExperienceDetail } from '@/db/schema';
import { type ExperienceType, type ProfileType } from '@/lib/dtos';

export class ExperiencesService {
  constructor(
    private readonly experiencesRepository: ExperiencesRepository,
    private readonly profileService: ProfileService,
  ) {}

  async getExperiencesByProfileSlug(slug: string): Promise<ExperienceType[]> {
    const profile: ProfileType = await this.profileService.getProfileBySlug(slug);

    const experiencesWithDetails: (DBExperience & { details: DBExperienceDetail[] })[] =
      await this.experiencesRepository.getExperienceWithDetailsByProfileId(profile.id);

    return experiencesWithDetails.map(toExperienceType);
  }
}
