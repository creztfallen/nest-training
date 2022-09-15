import { Status } from '@prisma/client';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
  @IsOptional()
  @IsString()
  search?: string;
}
