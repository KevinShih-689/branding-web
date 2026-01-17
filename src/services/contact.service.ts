import { ContactRepository } from '@/repositories';
import { ProfileService } from '@/services';
import { type NewContactSubmission } from '@/db/schema/contactSubmissions';
import { type ContactSubmissionPayloadType, type ContactSubmissionResponseType } from '@/lib/dtos';

export class ContactService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly profileService: ProfileService,
  ) {}

  async createContact(slug: string, payload: ContactSubmissionPayloadType): Promise<ContactSubmissionResponseType> {
    const profile = await this.profileService.getProfileBySlug(slug);

    const newContact: NewContactSubmission = {
      profileId: profile.id,
      senderName: payload.sender_name,
      senderEmail: payload.sender_email,
      message: payload.message,
    };

    const savedContact = await this.contactRepository.create(newContact);

    return {
      id: savedContact.id,
      created_at: savedContact.createdAt.toISOString(),
    };
  }
}
