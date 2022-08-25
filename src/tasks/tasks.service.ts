import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = ['Study Turkish', 'Study Nest.js', 'Study Japanese'];

    getAllTasks() {
        return this.tasks;
    }
}
