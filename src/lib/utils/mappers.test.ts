import { describe, it, expect } from 'vitest';
import { toProfileType } from './mappers';
import { type Profile as DBProfile } from '@/db/schema/profiles';

describe('mappers', () => {
  describe('toProfileType', () => {
    it('should convert DB profile to API profile type by omitting timestamps', () => {
      // Arrange
      const mockDate = new Date('2023-01-01');
      const dbProfile: DBProfile = {
        id: '123',
        slug: 'test-user',
        fullName: 'Test User',
        headline: 'Developer',
        avatarUrl: 'https://example.com/avatar.jpg',
        email: 'test@example.com',
        phone: '123-456-7890',
        location: 'Test City',
        bio: 'Hello world',
        githubUrl: 'https://github.com/test',
        linkedinUrl: 'https://linkedin.com/in/test',
        cakeResumeUrl: 'https://cakeresume.com/test',
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      // Act
      const result = toProfileType(dbProfile);

      // Assert
      expect(result).toEqual({
        id: '123',
        slug: 'test-user',
        fullName: 'Test User',
        headline: 'Developer',
        avatarUrl: 'https://example.com/avatar.jpg',
        email: 'test@example.com',
        phone: '123-456-7890',
        location: 'Test City',
        bio: 'Hello world',
        githubUrl: 'https://github.com/test',
        linkedinUrl: 'https://linkedin.com/in/test',
        cakeResumeUrl: 'https://cakeresume.com/test',
      });
      expect(result).not.toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('updatedAt');
    });
  });
});
