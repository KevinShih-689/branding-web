import { ProfileRepository } from '@/repositories/profileRepository';
import { type Profile as DBProfile } from '@/db/schema';
import { PaginatedResponse } from '@/types/common';
import { type ProfileType } from '@/types/profile';

export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  private mapToProfileType(profile: DBProfile): ProfileType {
    const { password_hash, createdAt, updatedAt, ...rest } = profile;

    return {
      ...rest,
    } as ProfileType;
  }

  async getProfiles(params: { page: number; limit: number }): Promise<PaginatedResponse<ProfileType>> {
    const { page, limit } = params;

    const offset = (page - 1) * limit;

    const [profiles, totalCount] = await Promise.all([
      this.profileRepository.findMany(limit, offset),
      this.profileRepository.count(),
    ]);

    const safeProfiles = profiles.map((profile) => this.mapToProfileType(profile));

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: safeProfiles,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages,
      },
    };
  }
}
