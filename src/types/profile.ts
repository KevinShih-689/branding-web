import { type Profile } from '@/db/schema/profiles';

export type ProfileType = Omit<Profile, 'password_hash' | 'createdAt' | 'updatedAt'>;
