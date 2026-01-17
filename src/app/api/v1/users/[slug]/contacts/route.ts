import { createSuccessResponse, apiHandler, container, BadRequestError, parseJson } from '@/lib/api';
import { type ContactSubmissionResponseType, ContactSubmissionPayloadSchema } from '@/lib/dtos';

export const POST = apiHandler<{ slug: string }>(async (req, context) => {
  const { slug } = await context.params;

  const json = await parseJson(req);

  const validationResult = ContactSubmissionPayloadSchema.safeParse(json);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues.map((e) => e.message).join(', ');
    throw new BadRequestError(errorMessage);
  }

  const body = validationResult.data;

  const result = await container.contactService.createContact(slug, body);

  return createSuccessResponse<ContactSubmissionResponseType>({
    data: result,
    message: 'Message sent successfully',
    httpStatus: 201,
  });
});
