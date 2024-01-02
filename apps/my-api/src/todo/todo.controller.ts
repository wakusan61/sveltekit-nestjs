import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetAllResponceDTO } from './dto/get-responce.dto';
import { TodoService } from './todo.service';
import { UpdateRequestDTO } from './dto/update-request.dto';
import { AddRequestDTO } from './dto/add-request.dto';
import { ApiCreatedResponse,ApiParam } from '@nestjs/swagger'

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService){} 
  @Get()
  @ApiCreatedResponse({
    type: GetAllResponceDTO,
  })
  getAll():GetAllResponceDTO {
    return { 
      todos: this.todoService.getAll()
    }
  }

  @Post('add')
  add(@Body() dto: AddRequestDTO):void {
    this.todoService.add(dto)
  }


  @Post('update')
  update(@Body() dto: UpdateRequestDTO):void {
    this.todoService.update(dto)
  }

  @Post('remove/:no')
  @ApiParam({
    name: 'no'
  })
  remove(@Param('no') no: number):void {
    console.log(no)
    this.todoService.remove(no)
  }
}
