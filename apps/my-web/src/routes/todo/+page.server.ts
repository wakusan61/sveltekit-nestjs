import type { PageServerLoad } from "./$types"
import type { Todo } from "$lib/todo"
import { createRequestURL } from "$lib/define"

type PageData = {
  todos: Todo[]
}

export const load: PageServerLoad = async (serverLoad):Promise<PageData> => {
  // TODO:open apiの定義から生成できるようにリファクタすること
  // TODO:エラーハンドリングが適当なので要リファクタ
  try {
    const body:PageData = await (await serverLoad.fetch(createRequestURL("/todo/all"))).json()
    console.table(body)
    return body
  } catch (error) {
    console.error(error)
    throw new Error("リクエストでエラーが発生しました。")
  }
}