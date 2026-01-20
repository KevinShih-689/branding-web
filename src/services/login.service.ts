import { ProfileRepository, AuthRepository } from '@/repositories';
import { AuthenticationError } from '@/lib/api';
import { toProfileType } from '@/lib/utils/mappers';
import { type Session } from '@supabase/supabase-js';
import { type ProfileType } from '@/lib/dtos';

export class LoginService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(slug: string, password: string): Promise<{ user: ProfileType; session: Session }> {
    const profile = await this.profileRepository.findBySlug(slug);

    if (!profile || !profile.email) {
      throw new AuthenticationError('Invalid credentials');
    }

    const authResponse = await this.authRepository.signInWithPassword(profile.email, password);

    const {
      data: { session },
      error,
    } = authResponse;

    if (error || !session) {
      throw new AuthenticationError('Invalid credentials');
    }

    return {
      user: toProfileType(profile),
      session,
    };
  }
}
