import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { SkillCategoriesService } from '@/services/skillCategoriesService';
import { SkillCategoriesRepository } from '@/repositories/skillCategoriesRepository';
import { type SkillCategoryType } from '@/types/skillCategories';

const skillCategoriesService = new SkillCategoriesService(new SkillCategoriesRepository());

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const skillCategories: SkillCategoryType[] = await skillCategoriesService.getSkillCategoriesByProfileSlug(slug);

  return createSuccessResponse<SkillCategoryType[]>({ data: skillCategories, message: 'Get skill categories success' });
});
