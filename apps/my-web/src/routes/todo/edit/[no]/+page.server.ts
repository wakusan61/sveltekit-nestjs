import { createRequestURL } from "$lib/define";
import type { Todo } from "$lib/todo";
import type { PageServerLoad } from "./$types";

type PageData = {
  todo: Todo
}
/**
 * TODO: URLのnoが数字以外の場合のチェックを追加すること
 */
export const load:PageServerLoad = async (serverLoad) => {
  try {
    const result:Todo = await (await serverLoad.fetch(createRequestURL(`/todo/${serverLoad.params.no}`))).json()
    return {todo:result}
  } catch (error) {
    console.error(error)
    throw new Error("リクエストでエラーが発生しました。")
  }
}