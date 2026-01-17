import { createSuccessResponse, apiHandler, container } from '@/lib/api';
import { type TechToolType } from '@/lib/dtos';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const techTools: TechToolType[] = await container.techToolsService.getTechToolsByProfileSlug(slug);

  return createSuccessResponse<TechToolType[]>({ data: techTools, message: 'Get tech tools success' });
});
