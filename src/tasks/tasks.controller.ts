import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Status, Tasks } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { PatchTaskDto } from './dto/patch-task.dto';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query('status') status: Status,
    @Query('search') search: string,
  ): Promise<Tasks[]> {
    return this.tasksService.getTasks(status, search);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body() patchTaskDto: PatchTaskDto,
  ): Promise<Tasks> {
    const { status } = patchTaskDto;
    return this.tasksService.updateTask(id, status);
  }
}
