import { type SkillCategory as DBSkillCategory } from '@/db/schema/skillCategories';
import { type Profile as DBProfile } from '@/db/schema/profiles';
import { type SkillCategoryType } from '@/types/skillCategories';
import { type ProfileType } from '@/types/profile';

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
