import { CertificationsRepository } from '@/repositories';
import { ProfileService } from './profile.service';
import { toCertificationType } from '@/lib/utils/mappers';
import { type Certification as DBCertification } from '@/db/schema/certifications';
import { type CertificationType } from '@/types';

export class CertificationsService {
  constructor(
    private readonly certificationsRepository: CertificationsRepository,
    private readonly profileService: ProfileService,
  ) {}

  async getCertificationsBySlug(slug: string): Promise<CertificationType[]> {
    await this.profileService.getProfileBySlug(slug);

    const certifications: DBCertification[] = await this.certificationsRepository.findByProfileSlug(slug);

    return certifications.map(toCertificationType);
  }
}
