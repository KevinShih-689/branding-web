import {
  ProfileRepository,
  SkillCategoriesRepository,
  TechToolsRepository,
  ExperiencesRepository,
  CertificationsRepository,
  ContactRepository,
  DocumentsRepository,
  AuthRepository,
} from '@/repositories';
import {
  ProfileService,
  SkillCategoriesService,
  TechToolsService,
  ExperiencesService,
  CertificationsService,
  ContactService,
  DocumentsService,
  LoginService,
} from '@/services';

class Container {
  private _profileRepository?: ProfileRepository;
  private _skillCategoriesRepository?: SkillCategoriesRepository;
  private _techToolsRepository?: TechToolsRepository;
  private _experiencesRepository?: ExperiencesRepository;
  private _certificationsRepository?: CertificationsRepository;
  private _contactRepository?: ContactRepository;
  private _documentsRepository?: DocumentsRepository;
  private _authRepository?: AuthRepository;

  private _profileService?: ProfileService;
  private _skillCategoriesService?: SkillCategoriesService;
  private _techToolsService?: TechToolsService;
  private _experiencesService?: ExperiencesService;
  private _certificationsService?: CertificationsService;
  private _contactService?: ContactService;
  private _documentsService?: DocumentsService;
  private _loginService?: LoginService;

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

  get certificationsRepository(): CertificationsRepository {
    return (this._certificationsRepository ??= new CertificationsRepository());
  }

  get contactRepository(): ContactRepository {
    return (this._contactRepository ??= new ContactRepository());
  }

  get documentsRepository(): DocumentsRepository {
    return (this._documentsRepository ??= new DocumentsRepository());
  }

  get authRepository(): AuthRepository {
    return (this._authRepository ??= new AuthRepository());
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
    return (this._techToolsService ??= new TechToolsService(this.techToolsRepository, this.profileService));
  }

  get experiencesService(): ExperiencesService {
    return (this._experiencesService ??= new ExperiencesService(this.experiencesRepository, this.profileService));
  }

  get certificationsService(): CertificationsService {
    return (this._certificationsService ??= new CertificationsService(
      this.certificationsRepository,
      this.profileService,
    ));
  }

  get contactService(): ContactService {
    return (this._contactService ??= new ContactService(this.contactRepository, this.profileService));
  }

  get documentsService(): DocumentsService {
    return (this._documentsService ??= new DocumentsService(this.documentsRepository, this.profileService));
  }

  get loginService(): LoginService {
    return (this._loginService ??= new LoginService(this.profileRepository, this.authRepository));
  }
}

export const container = new Container();
