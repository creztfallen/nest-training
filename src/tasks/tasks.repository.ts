import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaClient, Tasks } from '@prisma/client';
import { Status } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TasksRepository {
  constructor() {}

  async getTasks(status: Status, search: string): Promise<Tasks[]> {
    // const { status, search } = filterDto;

    if (search) {
      return await prisma.tasks.findMany({
        where: {
          title: {
            contains: search,
          },
        },
      });
    }

    if (status) {
      return await prisma.tasks.findMany({
        where: {
          status,
        },
      });
    } else {
      return await prisma.tasks.findMany();
    }
  }

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
    const task: Tasks = await prisma.tasks.create({
      data: { title, description, status: Status.OPEN },
    });

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task: Tasks = await prisma.tasks.delete({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }

  async updateTask(id: string, status: Status) {
    const task: Tasks = await prisma.tasks.update({
      where: { id },
      data: { status },
    });
    return task;
  }
}
