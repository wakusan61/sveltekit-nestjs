import { z } from "zod";
import { TodoSchema, Todo } from "../schma/todo-schema";
import { createZodDto } from "nestjs-zod";

export const GetAllResponseSchema = z.object({
  todos: TodoSchema.array()
})

export class GetAllResponseDTO extends createZodDto(GetAllResponseSchema) {}