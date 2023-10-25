import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { Status } from './models/task.enum';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks:Task[] = [{id:'1', title:'some title',description: 'some description', status:Status.DONE}];

    public getAllTask(): Task[]{
        return this.tasks;
    }

    public createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: Status.OPEN
        }

        this.tasks.push(task);

        return task
    }
}
