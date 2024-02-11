import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './schma/todo-schema';
import { TodoRepository } from '../lib/repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repository: TodoRepository) {
    this.repository.add({
      title: 'Svlete5',
      detail: 'Svelte5のRuneの仕様をキャッチアップする',
      category: '仕事',
    });
    this.repository.add({
      title: '買い物',
      detail: 'トイレットペーパーを買いに行く',
      category: 'プライベート',
    });
    this.repository.add({
      title: '読書',
      detail: 'エンジニアリングマネージャの仕事を読む',
      category: 'その他',
    });
  }

  get(no: number) {
    return this.repository.get(no);
  }

  getAll() {
    return this.repository.getAll();
  }

  add(todo: Todo): number {
    return this.repository.add(todo);
  }

  remove(no: number) {
    return this.repository.remove(no);
  }

  update(todo: Todo) {
    return this.repository.update(todo);
  }
}
