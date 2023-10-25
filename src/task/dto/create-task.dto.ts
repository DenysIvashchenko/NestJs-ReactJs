import { IsNotEmpty } from 'class-validator';
import { Status } from '../models/task.enum';

export class CreateTaskDto {
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    public description: string;

    public status?: Status

}