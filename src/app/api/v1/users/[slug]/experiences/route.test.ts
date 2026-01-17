import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { container, NotFoundError, InternalServerError } from '@/lib/api';
import { ExperiencesService } from '@/services';
import { type ExperienceType } from '@/lib/dtos';
import { GET } from './route';

describe('API: GET /api/v1/users/[slug]/experiences', () => {
  let experiencesServiceMock: DeepMockProxy<ExperiencesService>;

  beforeEach(() => {
    experiencesServiceMock = mockDeep<ExperiencesService>();

    vi.spyOn(container, 'experiencesService', 'get').mockReturnValue(experiencesServiceMock);
  });

  const createRequest = (slug: string) => {
    return new NextRequest(`http://localhost/api/v1/users/${slug}/experiences`);
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 200 and experiences data when user exists', async () => {
    const mockSlug = 'kevin-wang';
    const mockExperiences: ExperienceType[] = [
      {
        id: 'exp-1',
        companyName: 'Tech Corp',
        companyLink: 'https://techcorp.com',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        details: [
          {
            id: 'detail-1',
            experienceId: 'exp-1',
            position: 'Senior Engineer',
            content: ['Built things', 'Fixed bugs'],
            startDate: '2022-01-01',
            endDate: null,
            displayOrder: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ];

    experiencesServiceMock.getExperiencesByProfileSlug.calledWith(mockSlug).mockResolvedValue(mockExperiences);

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual(JSON.parse(JSON.stringify(mockExperiences)));
    expect(json.metadata.status).toBe('success');
    expect(json.metadata.message).toBe('Get experiences success');
  });

  it('should return 404 when user is not found (via ExperiencesService)', async () => {
    const mockSlug = 'unknown-user';
    experiencesServiceMock.getExperiencesByProfileSlug
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
    experiencesServiceMock.getExperiencesByProfileSlug
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
