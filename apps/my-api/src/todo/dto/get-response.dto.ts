import { ApiProperty } from "@nestjs/swagger";
import { Todo } from "../model/todo";

export class GetResponseDTO extends Todo {
  @ApiProperty()
  no: number
}