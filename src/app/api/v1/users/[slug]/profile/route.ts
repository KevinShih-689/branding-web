import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { ProfileService } from '@/services/profileService';
import { ProfileRepository } from '@/repositories/profileRepository';
import { ProfileType } from '@/types/profile';

const profileService = new ProfileService(new ProfileRepository());

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const profile: ProfileType = await profileService.getProfileBySlug(slug);

  return createSuccessResponse<ProfileType>({ data: profile, message: 'Get profile success' });
});
