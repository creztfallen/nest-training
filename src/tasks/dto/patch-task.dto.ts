import { Status } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class PatchTaskDto {
  @IsEnum(Status)
  status: Status;
}
