import { z } from "zod";

export const TodoSchema = z.object({
  no: z.number().refine(v => v > 0,{
    message: "1以上の値を設定してください。"
  }),
  title: z.string().max(20,"最大20文字までしか入力できません。").min(1,"最低1文字は入力してください。"),
  detail: z.string().max(100,"最大100文字までしか入力できません。").optional(),
  category: z.union([z.literal("仕事"),z.literal("プライベート"),z.literal("その他")])
})

export type Todo = z.infer<typeof TodoSchema>