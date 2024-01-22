import { z } from "zod";

export const TodoSchema = z.object({
  no: z.number(),
  title: z.string(),
  detail: z.string(),
  category: z.union([z.literal("仕事"),z.literal("プライベート"),z.literal("その他")])
})

export type TodoType = z.infer<typeof TodoSchema>