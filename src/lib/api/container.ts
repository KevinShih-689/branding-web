import { ProfileRepository } from '@/repositories/profileRepository';
import { SkillCategoriesRepository } from '@/repositories/skillCategoriesRepository';
import { TechToolsRepository } from '@/repositories/techToolsRepository';
import { ProfileService } from '@/services/profileService';
import { SkillCategoriesService } from '@/services/skillCategoriesService';
import { TechToolsService } from '@/services/techToolsService';

class Container {
  private _profileRepository?: ProfileRepository;
  private _skillCategoriesRepository?: SkillCategoriesRepository;
  private _techToolsRepository?: TechToolsRepository;
  private _profileService?: ProfileService;
  private _skillCategoriesService?: SkillCategoriesService;
  private _techToolsService?: TechToolsService;

  get profileRepository(): ProfileRepository {
    return (this._profileRepository ??= new ProfileRepository());
  }

  get skillCategoriesRepository(): SkillCategoriesRepository {
    return (this._skillCategoriesRepository ??= new SkillCategoriesRepository());
  }

  get techToolsRepository(): TechToolsRepository {
    return (this._techToolsRepository ??= new TechToolsRepository());
  }

  get profileService(): ProfileService {
    return (this._profileService ??= new ProfileService(this.profileRepository));
  }

  get skillCategoriesService(): SkillCategoriesService {
    return (this._skillCategoriesService ??= new SkillCategoriesService(
      this.skillCategoriesRepository,
      this.profileService,
    ));
  }

  get techToolsService(): TechToolsService {
    return (this._techToolsService ??= new TechToolsService(this.techToolsRepository, this.skillCategoriesService));
  }
}

export const container = new Container();
