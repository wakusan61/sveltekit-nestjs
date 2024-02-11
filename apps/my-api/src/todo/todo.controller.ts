import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { GetAllResponseDTO } from './dto/get-all-response.dto';
import { TodoService } from './todo.service';
import { UpdateRequestDTO } from './dto/update-request.dto';
import { AddRequestDTO } from './dto/add-request.dto';
import { ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { GetResponseDTO } from './dto/get-response.dto';
import { GetRequestDTO } from './dto/get-request.dto';
import { RemoveREquestDTO as RemoveRequestDTO } from './dto/remove-request.dto';
import { ApiAllParams } from '../lib/decorator/api-all-params';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all')
  @ApiCreatedResponse({
    type: GetAllResponseDTO,
  })
  getAll(): GetAllResponseDTO {
    return {
      todos: this.todoService.getAll(),
    };
  }

  @Get(':no')
  // ApiParamをZodDTOを渡すだけで定義できるように修正
  @ApiAllParams(GetRequestDTO)
  @ApiCreatedResponse({
    type: GetResponseDTO,
  })
  get(@Param() params: GetRequestDTO): GetResponseDTO {
    const todo = this.todoService.get(params.no);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Post('add')
  add(@Body() dto: AddRequestDTO): void {
    // TODO サービスのエラーに応じたExceptionを投げる。
    this.todoService.add(dto);
  }

  @Post('update')
  update(@Body() dto: UpdateRequestDTO): void {
    // TODO サービスのエラーに応じたExceptionを投げる。
    this.todoService.update(dto);
  }

  @Post('remove/:no')
  @ApiParam({
    name: 'no',
  })
  remove(@Param() params: RemoveRequestDTO): void {
    // TODO サービスのエラーに応じたExceptionを投げる。
    this.todoService.remove(params.no);
  }
}
