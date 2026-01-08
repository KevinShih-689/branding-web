import { SkillCategoriesRepository } from '@/repositories/skillCategoriesRepository';
import { type SkillCategory as DBSkillCategory } from '@/db/schema/skillCategories';
import { type SkillCategoryType } from '@/types/skillCategories';
import { toSkillCategoryType } from '@/lib/utils/mappers';

export class SkillCategoriesService {
  constructor(private readonly skillCategoriesRepository: SkillCategoriesRepository) {}

  async getSkillCategoriesByProfileId(profileId: string): Promise<SkillCategoryType[]> {
    const skillCategories: DBSkillCategory[] = await this.skillCategoriesRepository.findByProfileId(profileId);

    return skillCategories.map(toSkillCategoryType);
  }

  async getSkillCategoriesByProfileSlug(slug: string): Promise<SkillCategoryType[]> {
    const skillCategories: DBSkillCategory[] = await this.skillCategoriesRepository.findByProfileSlug(slug);

    return skillCategories.map(toSkillCategoryType);
  }
}
