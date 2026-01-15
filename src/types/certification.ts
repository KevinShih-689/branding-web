import { type Certification } from '@/db/schema/certifications';

export type CertificationType = Omit<Certification, 'categoryId' | 'deletedAt'>;
