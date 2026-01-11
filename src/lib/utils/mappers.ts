import { type SkillCategory as DBSkillCategory } from '@/db/schema/skillCategories';
import { type Profile as DBProfile } from '@/db/schema/profiles';
import { type TechTool as DBTechTool } from '@/db/schema/techTools';
import {
  type SkillCategoryType,
  type ProfileType,
  type TechToolType,
  type ExperienceType,
  type ExperienceDetailType,
} from '@/types';
import { type Experience as DBExperience, type ExperienceDetail as DBExperienceDetail } from '@/db/schema';

function omitKeys<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

export function toProfileType(profile: DBProfile): ProfileType {
  return omitKeys(profile, ['createdAt', 'updatedAt']);
}

export function toSkillCategoryType(category: DBSkillCategory): SkillCategoryType {
  return omitKeys(category, ['profileId']);
}

export function toTechToolType(techTool: DBTechTool): TechToolType {
  return omitKeys(techTool, ['deletedAt']);
}

export function toExperienceType(experience: DBExperience & { details: DBExperienceDetail[] }): ExperienceType {
  return {
    ...omitKeys(experience, ['profileId', 'deletedAt']),
    details: experience.details.map(toExperienceDetailType),
  };
}

export function toExperienceDetailType(detail: DBExperienceDetail): ExperienceDetailType {
  return omitKeys(detail, ['deletedAt']);
}
