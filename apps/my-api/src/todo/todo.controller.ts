import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetAllResponseDTO } from './dto/get-all-response.dto';
import { TodoService } from './todo.service';
import { UpdateRequestDTO } from './dto/update-request.dto';
import { AddRequestDTO } from './dto/add-request.dto';
import { ApiCreatedResponse,ApiParam } from '@nestjs/swagger'
import { GetResponseDTO } from './dto/get-response.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService){} 

  @Get('all')
  @ApiCreatedResponse({
    type: GetAllResponseDTO,
  })
  getAll():GetAllResponseDTO {
    return { 
      todos: this.todoService.getAll()
    }
  }

  @Get(':no')
  @ApiCreatedResponse({
    type: GetResponseDTO
  })
  get(@Param('no') no:number):GetResponseDTO {
    return {
      ...this.todoService.get(no),
      no: no
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
    this.todoService.remove(no)
  }
}
