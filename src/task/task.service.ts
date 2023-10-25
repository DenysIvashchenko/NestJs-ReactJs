import { FilterTaskDto } from './dto/filter-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './models/task.model';
import { Status } from './models/task.enum';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks:Task[] = [{id:'1', title:'some title',description: 'some description', status:Status.DONE},{id:'2', title:'some title 2',description: 'some description 2', status:Status.OPEN}];

    public getAllTask(): Task[]{
        return this.tasks;
    }

    public getFilterTask(filterTaskDto: FilterTaskDto): Task[] {
        const { status, search } = filterTaskDto;
        let tasks:Task[] = this.getAllTask();
        if(status) {
            tasks = tasks.filter((task) => task.status === status)
        }
        if(search) {
            tasks = tasks.filter(({ title, description }) => title.includes(search) || description.includes(search))
        }

        return tasks;
    }

    public createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description, status } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: status ?? Status.OPEN
        }
        this.tasks.push(task);

        return task
    }

    public getTaskById(taskId: string): Task {
        const found = this.tasks.find(({id}) => id === taskId);
        if(!found) {
            throw new NotFoundException(`Task with id ${taskId}, notFound`);
        }
        return found;
    }

    public deleteTask(taskId: string): void {
        this.tasks = this.tasks.filter(({ id }) => id !== taskId);
    }

    public updateTask(id: string, status: Status): Task {
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }
}
