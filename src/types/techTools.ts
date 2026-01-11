import { type TechTool } from '@/db/schema/techTools';

export type TechToolType = Omit<TechTool, 'deletedAt'>;
