import { createZodDto } from "nestjs-zod";
import { TodoSchema } from "../schma/todo-schema";

export const UpdateRequestSchema = TodoSchema

export class UpdateRequestDTO extends createZodDto(TodoSchema) {}