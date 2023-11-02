import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from '../task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FilterTaskDto } from '../dto/filter-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../dto/task.schema';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    public getTasks(@Query() filterTaskDto: FilterTaskDto):Promise<Task[]> {
        return this.taskService.getAllTask(filterTaskDto);
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>  {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    public updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        const { status } = updateTaskDto;
        return this.taskService.updateTask(id, status);
    }
}
