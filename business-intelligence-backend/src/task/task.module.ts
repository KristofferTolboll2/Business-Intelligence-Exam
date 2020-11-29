import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Task, User])
    ],
    controllers: [],
    providers: [TaskService, TaskResolver, TaskService],
})
export class TaskModule {};