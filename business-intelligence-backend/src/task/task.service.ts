import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Brackets, IsNull, LessThan, MoreThan, Repository } from "typeorm";
import { isNull } from "util";
import { CreateTaskInput } from "./inputs/createTask.input";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
    constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>){}


    async getAllByUserId(userId: string): Promise<Task[]>{
        return await this.taskRepository.find({user: {id: Number(userId)}})
    }


    async getInitialUserTasks(userId: string): Promise<Task[]> {
        return await this.taskRepository.createQueryBuilder("task")
        .where(`task.user = :userId `, {userId})
        .andWhere(`task.completedAt IS NULL`)
        .getMany()
    }

    async updateTask(taskId: number): Promise<Task> {
        const timeStamp = new Date().toISOString()
        const task =  await this.taskRepository.createQueryBuilder("task")
        .update<Task>(Task, {completedAt: timeStamp})
        .where("task.id = :id", {id: taskId})
        .returning('*')
        .updateEntity(true)
        .execute();
        return task.raw;
    }

    async creteTaskFromInput(createTaskInput: CreateTaskInput): Promise<Task>{
        const user: User = await this.userRepository.findOne(createTaskInput.user);
        if(!user){
            throw new HttpException("User does not exist", HttpStatus.FORBIDDEN);
        }
        const task =  new Task({
            user: user,
            description: createTaskInput.description,
            expirationDate: new Date(String(createTaskInput.expirationDate)),
            completedAt: null, 
            title: createTaskInput.title
        })
        return await this.taskRepository.save(task)
    }

    async getTasksAfterDate(userId: number,  afterDate: Date){
        const tasks = await this.taskRepository.createQueryBuilder("task")
        .where("task.user = :userId", {userId})
        .andWhere(
            `"task"."expirationDate"
            BETWEEN :begin 
                AND :end`,
                {begin: new Date().toISOString(), end: afterDate.toISOString()}
        ).getMany()
        return tasks;
    }

    async getMostRelevantTasks(userId: number, limit: number){
        const tasks = await this.taskRepository.createQueryBuilder("task")
        .where("task.userId =:userId", {userId})
        .andWhere("task.completedAt IS NULL")
        .orderBy("task.taskCreatedAt", 'ASC')
        .limit(limit)
        .getMany();
        return tasks;
    }

    async getCompletedTasks(userId: number, limit: number){
        const tasks = await this.taskRepository.createQueryBuilder("task")
        .where("task.userId =:userId", {userId})
        .andWhere("task.completedAt IS NOT NULL")
        .orderBy("task.taskCreatedAt", 'ASC')
        .limit(limit)
        .getMany();
        return tasks;
    }


}