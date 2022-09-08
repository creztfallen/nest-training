import { TaskStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';

export class PatchTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
