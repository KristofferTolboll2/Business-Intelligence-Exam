import { HttpException, HttpStatus } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { Arg } from "type-graphql";
import { CreateTaskInput } from "./inputs/createTask.input";
import { GetRelevantTasksInput } from "./inputs/getRelevantTasks.input";
import { UpdateTaskInput } from './inputs/updateTaskInput';
import { Task, TaskTypes, validateTask } from "./task.entity";
import { TaskService } from "./task.service";



@Resolver()
export class TaskResolver {
    constructor(
        private readonly taskService: TaskService){}


    @Query(() => [Task])
    async getTasksByUserId(@Args("userId") id: string): Promise<Task[]>{
        const tasks: Task[] = await this.taskService.getAllByUserId(id);
        return tasks
    }

    @Mutation(() => Task)
    async createTask(@Args("input") input: CreateTaskInput): Promise<Task>{
        console.log(input)
        const task: Task = await this.taskService.creteTaskFromInput(input);
        return task
    }

    @Mutation(() => Task)
    async completeTask(@Args("id") id: string): Promise<Task> {
    const completedTask: Task = await this.taskService.updateTask(Number(id));
    console.log(completedTask)
    return completedTask[0]
    }


    @Query(() => [Task])
    async getInitialTasks(@Args("userId") id: string): Promise<Task[]> {
        console.log(id)
        const tasks: Task[] = await this.taskService.getInitialUserTasks(id);
        const mappedTasks: Task[] = tasks.map(task => new Task(task))
        return mappedTasks
    }

    @Query(() => [Task])
    async getTasksWithDate(@Args("userId") userId: string, @Args("date") date: string, @Args("isAfter") isAfter: boolean): Promise<Task[]> {
        const parsedDate = new Date(Date.parse(date));
        console.log(parsedDate)
        if(isAfter){
            return await this.taskService.getTasksAfterDate(Number(userId), parsedDate);
        }else{
            return await this.taskService.getTasksBeforeDate(Number(userId), parsedDate);
        }
    }

    @Query(() => [Task])
    async getRelevantTasks(@Args("input") input: GetRelevantTasksInput): Promise<Task[]>{
        const {userId, limit, type} = input;
        switch(type){
            case TaskTypes.MOST_RELEVANT:
                return await this.taskService.getMostRelevantTasks(Number(userId), limit);
            case TaskTypes.COMPLETED:
                return await this.taskService.getCompletedTasks(Number(userId), limit)
            case TaskTypes.NOT_COMPLETED:
                return await this.taskService.getMostRelevantTasks(Number(userId), limit);
            default:
                throw new HttpException("Type needs to be defined", HttpStatus.BAD_REQUEST)
    }

    }
}