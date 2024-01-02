export type Todo = {
  title: string 
  detail: string
  category: Category
}

export type Category = "仕事" | "プライベート" | "その他"