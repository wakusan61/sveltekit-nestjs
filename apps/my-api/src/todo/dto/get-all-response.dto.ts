import { Todo } from "../model/todo"
import { ApiProperty } from '@nestjs/swagger';

export class GetAllResponseDTO {
  @ApiProperty({type:[Todo]})
  todos: Todo[]
}