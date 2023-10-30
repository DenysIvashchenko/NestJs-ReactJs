import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../models/task.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public status: Status;
}