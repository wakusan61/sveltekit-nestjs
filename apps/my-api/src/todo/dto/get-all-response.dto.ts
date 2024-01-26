import { z } from 'zod';
import { TodoSchema } from '../schma/todo-schema';
import { createZodDto } from 'nestjs-zod';

const GetAllResponseSchema = z.object({
  todos: TodoSchema.array(),
});

export class GetAllResponseDTO extends createZodDto(GetAllResponseSchema) {}
