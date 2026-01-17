import { createSuccessResponse, apiHandler, container } from '@/lib/api';
import { type CertificationType } from '@/lib/dtos';

export const GET = apiHandler<{ slug: string }>(async (_, context) => {
  const { slug } = await context.params;

  const certifications: CertificationType[] = await container.certificationsService.getCertificationsBySlug(slug);

  return createSuccessResponse<CertificationType[]>({ data: certifications, message: 'Get certifications success' });
});
