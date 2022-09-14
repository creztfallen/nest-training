import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { PrismaClient, Tasks } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TasksService {
  constructor() {}

  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Tasks> {
    const found: Tasks = await prisma.tasks.findUnique({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;
    const task = prisma.tasks.create({
      data: { title, description, status: TaskStatus.OPEN },
    });

    return task;
  }

  //   deleteTask(id: string): void {
  //     const found = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   }
  //   updateTask(id: string, status: TaskStatus) {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }
}
