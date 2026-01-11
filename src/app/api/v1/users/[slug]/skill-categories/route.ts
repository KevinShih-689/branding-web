import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { container } from '@/lib/api/container';
import { type SkillCategoryType } from '@/types';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const skillCategories: SkillCategoryType[] =
    await container.skillCategoriesService.getSkillCategoriesByProfileSlug(slug);

  return createSuccessResponse<SkillCategoryType[]>({ data: skillCategories, message: 'Get skill categories success' });
});
