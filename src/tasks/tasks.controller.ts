import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':id')
  getTaksById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
    return 'Task Deleted';
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body() patchTaskDto: PatchTaskDto,
  ): Task {
    const { status } = patchTaskDto;
    return this.tasksService.updateTask(id, status);
  }
}
