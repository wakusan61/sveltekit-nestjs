import { createZodDto } from 'nestjs-zod';
import { TodoSchema } from '../schma/todo-schema';

const AddRequestSchema = TodoSchema.omit({ no: true });

export class AddRequestDTO extends createZodDto(AddRequestSchema) {}
