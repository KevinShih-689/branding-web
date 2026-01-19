import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { embedMany } from 'ai';
import ollama from '@/lib/ollama/ollama';
import { DocumentsRepository } from '@/repositories/documents.repository';
import { ProfileService } from '@/services/profile.service';

export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly profileService: ProfileService,
  ) {}

  async processAndSaveDocument(userId: string, fileBuffer: Buffer, filename: string) {
    await this.profileService.getProfileById(userId);

    const uint8Array = new Uint8Array(fileBuffer);
    const parser = new PDFParse({ data: uint8Array });
    const result = await parser.getText();
    const text = result.text;

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.createDocuments([text]);
    const chunkTexts = chunks.map((chunk) => chunk.pageContent);

    const { embeddings } = await embedMany({
      model: ollama.textEmbeddingModel('nomic-embed-text'),
      values: chunkTexts,
    });

    const documentsToSave = chunkTexts.map((content, index) => ({
      profileId: userId,
      content,
      embedding: embeddings[index],
      metadata: {
        filename,
        chunkIndex: index,
        totalChunks: chunks.length,
      },
    }));

    return await this.documentsRepository.createMany(documentsToSave);
  }
}
