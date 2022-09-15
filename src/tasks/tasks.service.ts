import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { PrismaClient, Tasks } from '@prisma/client';
import { TasksRepository } from './tasks.repository';

const prisma = new PrismaClient();

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Tasks[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Tasks> {
    return this.tasksRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  updateTask(id: string, status: Status) {
    return this.tasksRepository.updateTask(id, status);
  }
}
