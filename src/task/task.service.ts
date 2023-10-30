import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './models/task.enum';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
        constructor(@InjectRepository(Task) 
        private taskRepository: Repository<Task>) {}

    public async getAllTask(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const { status, search } = filterTaskDto;
        const query = this.taskRepository.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', {status})
        }
        if(search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany();

        return tasks;
    }

    public async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOneBy({id});
        if(!found) {
            throw new NotFoundException()
        }

        return found;
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description, status } = createTaskDto
        const task = this.taskRepository.create({
            title,
            description,
            status : status ?? Status.OPEN
        });
        await this.taskRepository.save(task);

        return task;
    }

    public async deleteTask(taskId: string): Promise<void> {
        const result = await this.taskRepository.delete(taskId);

        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }

    public async updateTask(id: string, status: Status): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        this.taskRepository.save(task);
        return task;
    }
}
