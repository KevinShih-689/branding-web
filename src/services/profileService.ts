import { ProfileRepository } from '@/repositories/profileRepository';
import { type Profile as DBProfile } from '@/db/schema';
import { type PaginatedResponse } from '@/types/common';
import { type ProfileType } from '@/types/profile';
import { NotFoundError } from '@/lib/api/error';
import { toProfileType } from '@/lib/utils/mappers';

export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfileBySlug(slug: string): Promise<ProfileType> {
    const profile: DBProfile | null = await this.profileRepository.findBySlug(slug);

    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    return toProfileType(profile);
  }

  async getProfiles(params: { page: number; limit: number }): Promise<PaginatedResponse<ProfileType>> {
    const { page, limit } = params;

    const offset = (page - 1) * limit;

    const [profiles, totalCount] = await Promise.all([
      this.profileRepository.findMany(limit, offset),
      this.profileRepository.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: profiles.map(toProfileType),
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
      },
    };
  }
}
