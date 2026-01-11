import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { type ProfileType } from '@/types';
import { container } from '@/lib/api/container';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const profile: ProfileType = await container.profileService.getProfileBySlug(slug);

  return createSuccessResponse<ProfileType>({ data: profile, message: 'Get profile success' });
});
