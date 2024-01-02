import type { PageServerLoad } from "./$types"
import type { Todo } from "$lib/todo"

type PageData = {
  todos: Todo[]
}

export const load: PageServerLoad = ({params}):PageData => {
  return {
    todos: [
      {
        title:  "dummy-title",
        detail: "dummy-detail",
        category: "仕事"
      },
      {
        title:  "dummy-title2",
        detail: "dummy-detail2",
        category: "仕事"
      }
    ]
  }
}