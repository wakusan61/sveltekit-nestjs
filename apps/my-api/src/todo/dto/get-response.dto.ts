import { TodoSchema } from '../schma/todo-schema';
import { createZodDto } from 'nestjs-zod';

const GetResponseSchema = TodoSchema;

export class GetResponseDTO extends createZodDto(GetResponseSchema) {}
