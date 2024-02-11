import { TodoRepository } from '../../src/lib/repository/todo.repository';
import { Todo } from '../../src/todo/schma/todo-schema';

export namespace TodoFixture {
  /**
   * TODO: Repositoryに依存した形でデータ登録はおかしいので後で正式に実装する。
   */
  export const add = (
    todo: Todo & { no: number },
    repository: TodoRepository,
  ): Todo => {
    const data: Todo = {
      title: `${todo.no}タイトル`,
      detail: `${todo.no}詳細`,
      category: 'プライベート',
      ...todo,
    };
    repository['todos'].push(data);
    return data;
  };
  export const removeAll = (repository: TodoRepository) => {
    repository['todos'].splice(0);
    repository['maxNo'] = 0;
  };
  export const get = (
    no: number,
    repository: TodoRepository,
  ): Todo | undefined => {
    return repository['todos'].find((v) => (v.no = no));
  };
}
