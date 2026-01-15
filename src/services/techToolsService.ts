import { TechToolsRepository } from '@/repositories';
import { ProfileService } from './profileService';
import { toTechToolType } from '@/lib/utils/mappers';
import { type TechTool as DBTechTool } from '@/db/schema/techTools';
import { type TechToolType } from '@/types';

export class TechToolsService {
  constructor(
    private readonly techToolsRepository: TechToolsRepository,
    private readonly profileService: ProfileService,
  ) {}

  async getTechToolsByProfileSlug(slug: string): Promise<TechToolType[]> {
    await this.profileService.getProfileBySlug(slug);

    const techTools: DBTechTool[] = await this.techToolsRepository.findByProfileSlug(slug);

    return techTools.map(toTechToolType);
  }
}
