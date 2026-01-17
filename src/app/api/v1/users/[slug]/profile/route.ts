import { createSuccessResponse, apiHandler, container } from '@/lib/api';
import { type ProfileType } from '@/lib/dtos';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const profile: ProfileType = await container.profileService.getProfileBySlug(slug);

  return createSuccessResponse<ProfileType>({ data: profile, message: 'Get profile success' });
});
