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
    const { sender_name, sender_email, message } = payload;

    const profile = await this.profileService.getProfileBySlug(slug);

    const newContact: NewContactSubmission = {
      profileId: profile.id,
      senderName: sender_name,
      senderEmail: sender_email,
      message: message,
    };

    const savedContact = await this.contactRepository.create(newContact);

    return {
      id: savedContact.id,
      created_at: savedContact.createdAt.toISOString(),
    };
  }
}
