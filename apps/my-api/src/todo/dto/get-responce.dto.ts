import { Todo } from "../model/todo"
import { ApiProperty } from '@nestjs/swagger';

export class GetAllResponceDTO {
  @ApiProperty({type:[Todo]})
  todos: Todo[]
}