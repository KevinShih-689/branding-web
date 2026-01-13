import {
  ProfileRepository,
  SkillCategoriesRepository,
  TechToolsRepository,
  ExperiencesRepository,
} from '@/repositories';
import { ProfileService, SkillCategoriesService, TechToolsService, ExperiencesService } from '@/services';

class Container {
  private _profileRepository?: ProfileRepository;
  private _skillCategoriesRepository?: SkillCategoriesRepository;
  private _techToolsRepository?: TechToolsRepository;
  private _experiencesRepository?: ExperiencesRepository;

  private _profileService?: ProfileService;
  private _skillCategoriesService?: SkillCategoriesService;
  private _techToolsService?: TechToolsService;
  private _experiencesService?: ExperiencesService;

  get profileRepository(): ProfileRepository {
    return (this._profileRepository ??= new ProfileRepository());
  }

  get skillCategoriesRepository(): SkillCategoriesRepository {
    return (this._skillCategoriesRepository ??= new SkillCategoriesRepository());
  }

  get techToolsRepository(): TechToolsRepository {
    return (this._techToolsRepository ??= new TechToolsRepository());
  }

  get experiencesRepository(): ExperiencesRepository {
    return (this._experiencesRepository ??= new ExperiencesRepository());
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

  get experiencesService(): ExperiencesService {
    return (this._experiencesService ??= new ExperiencesService(this.experiencesRepository, this.profileService));
  }
}

export const container = new Container();
