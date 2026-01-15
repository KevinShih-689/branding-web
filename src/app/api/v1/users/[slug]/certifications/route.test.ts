import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { container } from '@/lib/api/container';
import { NotFoundError, InternalServerError } from '@/lib/api/error';
import { CertificationsService } from '@/services';
import { type CertificationType } from '@/types';
import { GET } from './route';

describe('API: GET /api/v1/users/[slug]/certifications', () => {
  let certificationsServiceMock: DeepMockProxy<CertificationsService>;

  beforeEach(() => {
    certificationsServiceMock = mockDeep<CertificationsService>();

    vi.spyOn(container, 'certificationsService', 'get').mockReturnValue(certificationsServiceMock);
  });

  const createRequest = (slug: string) => {
    return new NextRequest(`http://localhost/api/v1/users/${slug}/certifications`);
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 200 and certifications data when user exists', async () => {
    const mockSlug = 'kevin-wang';
    const mockCertifications: CertificationType[] = [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'AWS',
        issueDate: '2024-01-15',
        credentialUrl: 'https://aws.com/verify/123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    certificationsServiceMock.getCertificationsBySlug.calledWith(mockSlug).mockResolvedValue(mockCertifications);

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual(JSON.parse(JSON.stringify(mockCertifications)));
    expect(json.metadata.status).toBe('success');
    expect(json.metadata.message).toBe('Get certifications success');
  });

  it('should return 404 when user is not found (via CertificationsService)', async () => {
    const mockSlug = 'unknown-user';
    certificationsServiceMock.getCertificationsBySlug
      .calledWith(mockSlug)
      .mockRejectedValue(new NotFoundError('User does not exist'));

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.metadata.status).toBe('Not Found');
    expect(json.metadata.message).toBe('User does not exist');
  });

  it('should return 500 when an unexpected error occurs in service', async () => {
    const mockSlug = 'error-user';
    certificationsServiceMock.getCertificationsBySlug
      .calledWith(mockSlug)
      .mockRejectedValue(new InternalServerError('Internal Database Error'));

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.metadata.message).toBe('Internal Database Error');
  });
});
