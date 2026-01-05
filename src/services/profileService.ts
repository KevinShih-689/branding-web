import { ProfileRepository } from '@/repositories/profileRepository';
import { type Profile as DBProfile } from '@/db/schema';
import { type PaginatedResponse } from '@/types/common';
import { type ProfileType } from '@/types/profile';
import { NotFoundError } from '@/lib/api/error';

export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  private mapToProfileType(profile: DBProfile): ProfileType {
    const { createdAt, updatedAt, ...rest } = profile;

    return {
      ...rest,
    } as ProfileType;
  }

  async getProfileBySlug(slug: string): Promise<ProfileType> {
    const profile: DBProfile | null = await this.profileRepository.findBySlug(slug);

    if (!profile) {
      throw new NotFoundError('Profile not found');
    }

    return this.mapToProfileType(profile);
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
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
      },
    };
  }
}
