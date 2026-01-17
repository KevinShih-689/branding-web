import { createSuccessResponse, apiHandler, container, validateRequest } from '@/lib/api';
import {
  type ContactSubmissionResponseType,
  type ContactSubmissionPayloadType,
  ContactSubmissionPayloadSchema,
} from '@/lib/dtos';

export const POST = apiHandler<{ slug: string }>(async (req, context) => {
  const { slug } = await context.params;

  const reqData = await validateRequest<ContactSubmissionPayloadType>(req, ContactSubmissionPayloadSchema);

  const result = await container.contactService.createContact(slug, reqData);

  return createSuccessResponse<ContactSubmissionResponseType>({
    data: result,
    message: 'Message sent successfully',
    httpStatus: 201,
  });
});
