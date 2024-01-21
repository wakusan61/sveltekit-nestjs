import { BadRequestException, ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './model/todo';

@Injectable()
export class TodoService {
  private readonly todos:Todo[] = []
  private maxNo = 0
  constructor() {
    this.todos.push({no: this.getNextNo(),title:"Svlete5", detail:"Svelte5のRuneの仕様をキャッチアップする", category:"仕事"})
    this.todos.push({no: this.getNextNo(),title:"買い物", detail:"トイレットペーパーを買いに行く", category:"プライベート"})
    this.todos.push({no: this.getNextNo(),title:"読書", detail:"エンジニアリングマネージャの仕事を読む", category:"その他"})
    
  }

  private getNextNo() {
    this.maxNo++
    return this.maxNo
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
    this.todos.push({
      no: this.getNextNo(),
      ...todo
    })
  }

  remove(no: number) {
    const index = this.todos.findIndex(v => v.no == no)
    if(index == -1) throw new NotFoundException()
    this.todos.splice(index,1)
  }

  update(todo:Todo) {
    const index = this.todos.findIndex(v => v.no == todo.no)
    if(index == -1) throw new NotFoundException()
    this.todos[index] = todo
  }
}