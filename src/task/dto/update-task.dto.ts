import { IsEnum } from "class-validator";
import { Status } from "../models/task.enum";

export class UpdateTaskDto {
    @IsEnum(Status)
    public status: Status;
}