import { createSuccessResponse } from '@/lib/api/response';
import { apiHandler } from '@/lib/api/apiHandler';
import { container } from '@/lib/api/container';
import { type CertificationType } from '@/types';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const certifications: CertificationType[] = await container.certificationsService.getCertificationsBySlug(slug);

  return createSuccessResponse<CertificationType[]>({ data: certifications, message: 'Get certifications success' });
});
