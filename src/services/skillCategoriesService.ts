import { SkillCategoriesRepository } from '@/repositories/skillCategoriesRepository';
import { ProfileService } from '@/services/profileService';
import { toSkillCategoryType } from '@/lib/utils/mappers';
import { type SkillCategory as DBSkillCategory } from '@/db/schema/skillCategories';
import { type SkillCategoryType } from '@/types/skillCategories';
import { type ProfileType } from '@/types/profile';

export class SkillCategoriesService {
  constructor(
    private readonly skillCategoriesRepository: SkillCategoriesRepository,
    private readonly profileService: ProfileService,
  ) {}

  async getSkillCategoriesByProfileSlug(slug: string): Promise<SkillCategoryType[]> {
    const profile: ProfileType = await this.profileService.getProfileBySlug(slug);

    const skillCategories: DBSkillCategory[] = await this.skillCategoriesRepository.findByProfileId(profile.id);

    return skillCategories.map(toSkillCategoryType);
  }
}
