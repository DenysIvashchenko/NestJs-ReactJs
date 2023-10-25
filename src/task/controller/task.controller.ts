import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Status } from '../models/task.enum';
import { FilterTaskDto } from '../dto/filter-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    public getTasks(@Query() filterTaskDto: FilterTaskDto):Task[] {
        if(Object.keys(filterTaskDto).length) {
            return this.taskService.getFilterTask(filterTaskDto);
        } else {
            return this.taskService.getAllTask();
        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    public updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
        const { status } = updateTaskDto;
        return this.taskService.updateTask(id, status);
    }
}
