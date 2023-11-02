import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './models/task.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './dto/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    public async getAllTask(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const { status, search } = filterTaskDto;
        let options = {};

        if (search) {
            options = {
                $or: [
                    { title: new RegExp(search.toString(), 'i') },
                    { description: new RegExp(search.toString(), 'i') },
                ]
            }
        }
        if (status) {
            options = {
                $or: [{ status }]
            }
        }

        const tasks = await this.taskModel.find(options).exec()

        return tasks;
    }

    public async getTaskById(id: string): Promise<Task> {
        const found = await this.taskModel.findById(id).exec();
        if (!found) {
            throw new NotFoundException()
        }

        return found;
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        return createdTask.save();
    }

    public async deleteTask(taskId: string): Promise<void> {
        const result = await this.taskModel.findByIdAndDelete(taskId)
        if (!result) {
            throw new NotFoundException();
        }
    }

    public async updateTask(id: string, status: Status): Promise<Task> {
        const find = await this.taskModel.findById(id)
        find.status = status;
            
        return await find.save();
    }
}
