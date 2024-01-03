export type Todo = {
  no?: number
  title: string 
  detail: string
  category: Category
}

export type Category = "仕事" | "プライベート" | "その他"