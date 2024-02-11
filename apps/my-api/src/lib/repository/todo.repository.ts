import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/todo/schma/todo-schema';

@Injectable()
export class TodoRepository {
  private todos: Todo[] = new Array<Todo>();
  private maxNo: number = 0;
  constructor() {}

  private getNextNo() {
    this.maxNo++;
    return this.maxNo;
  }

  get(no: number): Todo | undefined {
    return this.todos.find((v) => v.no == no);
  }

  getAll(): Todo[] {
    return this.todos;
  }

  add(todo: Todo): number {
    const no = this.getNextNo();
    this.todos.push({
      no: no,
      ...todo,
    });
    return no;
  }

  remove(no: number) {
    const index = this.todos.findIndex((v) => v.no == no);
    // TODO:RepositoryのExcptionを返すべきだが一旦NestのNotFoundExcepitonを投げる
    if (index == -1) throw new NotFoundException();
    this.todos.splice(index, 1);
  }

  update(todo: Todo) {
    const index = this.todos.findIndex((v) => v.no == todo.no);
    // TODO:RepositoryのExcptionを返すべきだが一旦NestのNotFoundExcepitonを投げる
    if (index == -1) throw new NotFoundException();
    this.todos[index] = todo;
  }
}
