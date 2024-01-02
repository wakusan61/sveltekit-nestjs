import { Todo } from "../model/todo";
import { ApiProperty} from "@nestjs/swagger"

export class AddRequestDTO {
  @ApiProperty()
  title:string

  @ApiProperty()
  detail:string

  @ApiProperty()
  category: "仕事" | "プライベート" | "その他"

}