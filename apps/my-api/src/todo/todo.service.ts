import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './model/todo';

@Injectable()
export class TodoService {
  private readonly todos:Todo[] = []
  constructor() {
    this.todos.push({no: this.todos.length + 1,title:"Svlete5", detail:"Svelte5のRuneの仕様をキャッチアップする", category:"仕事"})
    this.todos.push({no: this.todos.length + 1,title:"買い物", detail:"トイレットペーパーを買いに行く", category:"プライベート"})
    this.todos.push({no: this.todos.length + 1,title:"読書", detail:"エンジニアリングマネージャの仕事を読む", category:"その他"})
  }
  
  get(no:number) {
    const todo = this.todos.find(v => v.no == no)
    if(!todo) throw new NotFoundException()
    return todo
  }

  getAll() {
    return this.todos
  }

  add(todo:Todo) {
    this.todos.push(todo)
  }

  remove(no: number) {
    const index = this.todos.findIndex(v => v.no = no)
    if(index == -1) throw new NotFoundException()
    this.todos.splice(index,1)
  }

  /**
   * FIXME:Todoのnoがオプショナルなのがおかしいので要検討
   */
  update(todo:Todo) {
    const index = this.todos.findIndex(v => v.no == todo.no)
    if(index == -1) throw new NotFoundException()
    this.todos[index] = todo
  }
}