import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetAllResponseDTO } from './dto/get-all-response.dto';
import { TodoService } from './todo.service';
import { UpdateRequestDTO, UpdateRequestSchema } from './dto/update-request.dto';
import { AddRequestDTO, AddRequestSchema } from './dto/add-request.dto';
import { ApiCreatedResponse,ApiParam } from '@nestjs/swagger'
import { GetResponseDTO } from './dto/get-response.dto';
import { ZodValidationPipe } from 'nestjs-zod';

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
  add(@Body(new ZodValidationPipe(AddRequestSchema)) dto: AddRequestDTO):void {
    this.todoService.add(dto)
  }


  @Post('update')
  update(@Body(new ZodValidationPipe(UpdateRequestSchema)) dto: UpdateRequestDTO):void {
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
