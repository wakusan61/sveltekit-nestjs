import { createZodDto } from 'nestjs-zod';
import { TodoSchema } from '../schma/todo-schema';

const UpdateRequestSchema = TodoSchema;

export class UpdateRequestDTO extends createZodDto(UpdateRequestSchema) {}
