import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { NextRequest } from 'next/server';
import { container } from '@/lib/api/container';
import { InternalServerError, NotFoundError } from '@/lib/api/error';
import { ProfileService } from '@/services';
import { type ProfileType } from '@/types';
import { GET } from './route';

describe('API: GET /api/v1/users/[slug]/profile', () => {
  let profileServiceMock: DeepMockProxy<ProfileService>;

  beforeEach(() => {
    profileServiceMock = mockDeep<ProfileService>();

    vi.spyOn(container, 'profileService', 'get').mockReturnValue(profileServiceMock);
  });

  const createRequest = (slug: string) => {
    return new NextRequest(`http://localhost/api/v1/users/${slug}/profile`);
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 200 and profile data when profile exists', async () => {
    const mockSlug = 'kevin-wang';
    const mockProfile: ProfileType = {
      id: '123',
      slug: mockSlug,
      fullName: 'Kevin Wang',
      headline: 'Dev',
      avatarUrl: 'img.jpg',
      email: 'test@test.com',
    } as ProfileType;

    profileServiceMock.getProfileBySlug.calledWith(mockSlug).mockResolvedValue(mockProfile);

    const req = createRequest(mockSlug);
    const context = createContext(mockSlug);
    const response = await GET(req, context);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual(mockProfile);
    expect(json.metadata.status).toBe('success');
  });

  it('should return 404 when profile is not found', async () => {
    const mockSlug = 'unknown-user';

    profileServiceMock.getProfileBySlug
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

  it('should return 500 when an unexpected error occurs', async () => {
    const mockSlug = 'error-user';
    profileServiceMock.getProfileBySlug
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
