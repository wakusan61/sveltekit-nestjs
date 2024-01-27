import { Todo } from '../../src/todo/schma/todo-schema';
import { TodoService } from '../../src/todo/todo.service';

export namespace TodoFixture {
  /**
   * TODO: サービスに依存した形でデータ登録はおかしいので後で正式に実装する。
   */
  export const add = (
    todo: Todo & { no: number },
    todoService: TodoService,
  ): Todo => {
    const data: Todo = {
      title: `${todo.no}タイトル`,
      detail: `${todo.no}詳細`,
      category: 'プライベート',
      ...todo,
    };
    todoService['todos'].push(data);
    return data;
  };
  export const removeAll = (todoService: TodoService) => {
    todoService['todos'].splice(0);
    todoService['maxNo'] = 0;
  };
  export const get = (
    no: number,
    todoService: TodoService,
  ): Todo | undefined => {
    return todoService['todos'].find((v) => (v.no = no));
  };
}
