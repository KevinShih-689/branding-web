import { db } from '@/db';
import { documents, type NewDocument } from '@/db/schema/documents';

export class DocumentsRepository {
  async createMany(data: NewDocument[]) {
    return await db.insert(documents).values(data).returning();
  }
}
