import { apiHandler, container, createSuccessResponse } from '@/lib/api';
import { type ExperienceType } from '@/lib/dtos';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const experiencesWitDetails: ExperienceType[] = await container.experiencesService.getExperiencesByProfileSlug(slug);

  return createSuccessResponse<ExperienceType[]>({ data: experiencesWitDetails, message: 'Get experiences success' });
});
