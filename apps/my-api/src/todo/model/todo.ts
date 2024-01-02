import { ApiProperty } from '@nestjs/swagger';

/**
 * FIXME:モデルを作成してDTOに継承させる形式は微妙なので要検討
 */
export class Todo {
  @ApiProperty()
  no?: number

  @ApiProperty()
  title:string

  @ApiProperty()
  detail:string

  @ApiProperty()
  category: "仕事" | "プライベート" | "その他"
}