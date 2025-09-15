import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SetPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
export function Public(): MethodDecorator {
  return applyDecorators(
    SetPublic(),
    ApiOperation({ security: [] }),
  );
}
