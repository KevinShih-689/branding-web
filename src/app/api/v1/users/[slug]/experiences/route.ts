import { apiHandler } from '@/lib/api/apiHandler';
import { container } from '@/lib/api/container';
import { createSuccessResponse } from '@/lib/api/response';
import { type ExperienceType } from '@/types';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const experiencesWitDetails: ExperienceType[] = await container.experiencesService.getExperiencesByProfileSlug(slug);

  return createSuccessResponse<ExperienceType[]>({ data: experiencesWitDetails, message: 'Get experiences success' });
});
