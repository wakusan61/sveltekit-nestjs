import { TodoSchema } from "../schma/todo-schema";
import { createZodDto } from "nestjs-zod";

export const GetResponseSchema = TodoSchema

export class GetResponseDTO extends createZodDto(TodoSchema) {}