import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const RemoveRequestSchema = z.object({
  // パスパラメータは文字列でくるため、coerce で文字列→数値変換にする。
  no: z.coerce.number(),
});

export class RemoveRequestDTO extends createZodDto(RemoveRequestSchema) {}
