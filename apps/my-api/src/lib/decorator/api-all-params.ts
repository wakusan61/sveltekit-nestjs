import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { ZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';

/**
 * OpenAPIの @ApiParam をZodDtoで実装できるようにしたユーティリティ
 */
export const ApiAllParams = (zodDto: ZodDto) => {
  const openApi = zodToOpenAPI(zodDto.schema);
  const decorators: MethodDecorator[] = [];
  if (typeof openApi.properties === 'object') {
    Object.entries(openApi.properties).forEach(([key, value]) => {
      decorators.push(
        ApiParam({
          name: key,
          type: 'type' in value ? value.type : undefined,
          required: (openApi.required ?? []).includes(key),
          description: 'description' in value ? value.description : '',
        }),
      );
    });
  }
  return applyDecorators(...decorators);
};
