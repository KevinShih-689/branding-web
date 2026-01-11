import { TechToolsRepository } from '@/repositories';
import { SkillCategoriesService } from './skillCategoriesService';
import { toTechToolType } from '@/lib/utils/mappers';
import { type TechTool as DBTechTool } from '@/db/schema/techTools';
import { type TechToolType, type SkillCategoryType } from '@/types';

export class TechToolsService {
  constructor(
    private readonly techToolsRepository: TechToolsRepository,
    private readonly skillCategoriesService: SkillCategoriesService,
  ) {}

  async getTechToolsByProfileSlug(slug: string): Promise<TechToolType[]> {
    const skillCategories: SkillCategoryType[] =
      await this.skillCategoriesService.getSkillCategoriesByProfileSlug(slug);

    if (skillCategories.length === 0) return [];

    const techTools: DBTechTool[] = await this.techToolsRepository.findByCategoryIds(
      skillCategories.map((skillCategory) => skillCategory.id),
    );

    return techTools.map(toTechToolType);
  }
}
