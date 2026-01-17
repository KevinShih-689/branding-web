import { createSuccessResponse, apiHandler, container } from '@/lib/api';
import { type SkillCategoryType } from '@/lib/dtos';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const skillCategories: SkillCategoryType[] =
    await container.skillCategoriesService.getSkillCategoriesByProfileSlug(slug);

  return createSuccessResponse<SkillCategoryType[]>({ data: skillCategories, message: 'Get skill categories success' });
});
