import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { NextRequest } from 'next/server';
import { container, NotFoundError, InternalServerError } from '@/lib/api';
import { SkillCategoriesService } from '@/services';
import { type SkillCategoryType } from '@/lib/dtos';
import { GET } from './route';

describe('API: GET /api/v1/users/[slug]/skill-categories', () => {
  let skillCategoriesServiceMock: DeepMockProxy<SkillCategoriesService>;

  beforeEach(() => {
    skillCategoriesServiceMock = mockDeep<SkillCategoriesService>();

    vi.spyOn(container, 'skillCategoriesService', 'get').mockReturnValue(skillCategoriesServiceMock);
  });

  const createRequest = (slug: string) => {
    return new NextRequest(`http://localhost/api/v1/users/${slug}/skill-categories`);
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 200 and skill categories data when user exists', async () => {
    const mockSlug = 'kevin-wang';
    const mockSkillCategories: SkillCategoryType[] = [
      {
        id: 'cat-1',
        name: 'Frontend',
        proficiency: 90,
        displayOrder: 1,
        isEnable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'cat-2',
        name: 'Backend',
        proficiency: 80,
        displayOrder: 2,
        isEnable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    skillCategoriesServiceMock.getSkillCategoriesByProfileSlug
      .calledWith(mockSlug)
      .mockResolvedValue(mockSkillCategories);

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual(JSON.parse(JSON.stringify(mockSkillCategories)));
    expect(json.metadata.status).toBe('success');
    expect(json.metadata.message).toBe('Get skill categories success');
  });

  it('should return 404 when user is not found (via SkillCategoriesService)', async () => {
    const mockSlug = 'unknown-user';
    skillCategoriesServiceMock.getSkillCategoriesByProfileSlug
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
    skillCategoriesServiceMock.getSkillCategoriesByProfileSlug
      .calledWith(mockSlug)
      .mockRejectedValue(new InternalServerError('Internal Server Error'));

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.metadata.message).toBe('Internal Server Error');
  });
});
