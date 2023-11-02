import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from '../models/task.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema({timestamps: true})
export class Task {
    @Prop()
    public title: string;

    @Prop()
    public description: string;

    @Prop({enum: Status})
    public status: Status;
}

export const TaskSchema = SchemaFactory.createForClass(Task);