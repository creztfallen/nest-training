import { TaskStatus } from '../tasks.model';
import { IsEnum } from 'class-validator';

export class PatchTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
