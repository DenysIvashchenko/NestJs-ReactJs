import { Status } from "../models/task.enum";

export class FilterTaskDto {
    public status?: Status;
    public search?: string;
}