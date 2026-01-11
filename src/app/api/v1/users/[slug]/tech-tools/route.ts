import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { type TechToolType } from '@/types';
import { container } from '@/lib/api/container';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const techTools: TechToolType[] = await container.techToolsService.getTechToolsByProfileSlug(slug);

  return createSuccessResponse<TechToolType[]>({ data: techTools, message: 'Get tech tools success' });
});
