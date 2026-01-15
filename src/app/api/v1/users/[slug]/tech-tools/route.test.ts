import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { NextRequest } from 'next/server';
import { container } from '@/lib/api/container';
import { NotFoundError, InternalServerError } from '@/lib/api/error';
import { TechToolsService } from '@/services';
import { type TechToolType } from '@/types';
import { GET } from './route';

describe('API: GET /api/v1/users/[slug]/tech-tools', () => {
  let techToolsServiceMock: DeepMockProxy<TechToolsService>;

  beforeEach(() => {
    techToolsServiceMock = mockDeep<TechToolsService>();

    vi.spyOn(container, 'techToolsService', 'get').mockReturnValue(techToolsServiceMock);
  });

  const createRequest = (slug: string) => {
    return new NextRequest(`http://localhost/api/v1/users/${slug}/tech-tools`);
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 200 and tech tools data when user exists', async () => {
    const mockSlug = 'kevin-wang';
    const mockTechTools: TechToolType[] = [
      {
        id: 'tool-1',
        categoryId: 'cat-1',
        name: 'React',
        iconKey: 'react',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'tool-2',
        categoryId: 'cat-1',
        name: 'Next.js',
        iconKey: 'nextjs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    techToolsServiceMock.getTechToolsByProfileSlug.calledWith(mockSlug).mockResolvedValue(mockTechTools);

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual(JSON.parse(JSON.stringify(mockTechTools)));
    expect(json.metadata.status).toBe('success');
    expect(json.metadata.message).toBe('Get tech tools success');
  });

  it('should return 404 when user is not found (via TechToolsService)', async () => {
    const mockSlug = 'unknown-user';
    techToolsServiceMock.getTechToolsByProfileSlug
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
    techToolsServiceMock.getTechToolsByProfileSlug
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
