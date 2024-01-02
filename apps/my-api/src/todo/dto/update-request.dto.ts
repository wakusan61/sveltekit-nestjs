import { Todo } from "../model/todo";
import { ApiProperty} from "@nestjs/swagger"

export class UpdateRequestDTO extends Todo {
  @ApiProperty()
  no: number
}