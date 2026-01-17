import { db } from '@/db';
import { contactSubmissions, type ContactSubmission, type NewContactSubmission } from '@/db/schema/contactSubmissions';

export class ContactRepository {
  async create(data: NewContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(data).returning();
    return result[0];
  }
}
