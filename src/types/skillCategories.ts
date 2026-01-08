import { type SkillCategory } from '@/db/schema/skillCategories';

export type SkillCategoryType = Omit<SkillCategory, 'profileId'>;
