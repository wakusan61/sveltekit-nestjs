import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const GetReqestSchema = z.object({
  no: z.coerce.number(),
});

export class GetRequestDTO extends createZodDto(GetReqestSchema) {}
