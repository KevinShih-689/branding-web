import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { NextRequest } from 'next/server';
import { container, NotFoundError } from '@/lib/api';
import { ContactService } from '@/services';
import { type ContactSubmissionResponseType } from '@/lib/dtos';
import { POST } from './route';

describe('API: POST /api/v1/users/[slug]/contacts', () => {
  let contactServiceMock: DeepMockProxy<ContactService>;

  beforeEach(() => {
    contactServiceMock = mockDeep<ContactService>();
    vi.spyOn(container, 'contactService', 'get').mockReturnValue(contactServiceMock);
  });

  const createRequest = (body: unknown) => {
    return new NextRequest('http://localhost/api/v1/users/test/contacts', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  const createContext = (slug: string) => ({
    params: Promise.resolve({ slug }),
  });

  it('should return 201 and created contact data when valid', async () => {
    const mockSlug = 'kevin-wang';
    const mockBody = {
      sender_name: 'John',
      sender_email: 'john@example.com',
      message: 'Hi',
    };
    const mockResponse: ContactSubmissionResponseType = {
      id: '501',
      created_at: '2025-01-01T00:00:00.000Z',
    };

    contactServiceMock.createContact.mockResolvedValue(mockResponse);

    const req = createRequest(mockBody);
    const context = createContext(mockSlug);
    const response = await POST(req, context);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.data).toEqual(mockResponse);
    expect(json.metadata.status).toBe('success');
  });

  it('should return 400 when body is invalid JSON', async () => {
    const mockSlug = 'kevin-wang';
    const req = new NextRequest('http://localhost/api/v1/users/test/contacts', {
      method: 'POST',
      body: 'invalid-json',
    });
    const context = createContext(mockSlug);
    const response = await POST(req, context);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.metadata.status).toBe('Bad Request');
  });

  it('should return 400 when required fields are missing', async () => {
    const mockSlug = 'kevin-wang';
    const mockBody = {
      sender_name: 'John',
      message: 'Hi',
    };

    const req = createRequest(mockBody);
    const context = createContext(mockSlug);
    const response = await POST(req, context);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.metadata.message).toContain('Sender email is required');
  });

  it('should return 400 when email format is invalid', async () => {
    const mockSlug = 'kevin-wang';
    const mockBody = {
      sender_name: 'John',
      sender_email: 'invalid-email',
      message: 'Hi',
    };

    const req = createRequest(mockBody);
    const context = createContext(mockSlug);
    const response = await POST(req, context);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.metadata.message).toContain('Sender email is required');
  });

  it('should return 404 when profile not found', async () => {
    const mockSlug = 'unknown';
    const mockBody = {
      sender_name: 'John',
      sender_email: 'john@example.com',
      message: 'Hi',
    };

    contactServiceMock.createContact.mockRejectedValue(new NotFoundError('Recipient not found.'));

    const req = createRequest(mockBody);
    const context = createContext(mockSlug);
    const response = await POST(req, context);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.metadata.message).toBe('Recipient not found.');
  });
});
