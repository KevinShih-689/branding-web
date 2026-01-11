import { type Experience } from '@/db/schema/experiences';
import { type ExperienceDetail } from '@/db/schema/experienceDetails';

export type ExperienceDetailType = Omit<ExperienceDetail, 'deletedAt'>;

export type ExperienceType = {
  details: ExperienceDetailType[];
} & Omit<Experience, 'profileId' | 'deletedAt'>;
