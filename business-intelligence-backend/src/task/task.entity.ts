import { Field, ID, ObjectType } from '@nestjs/graphql';
import { validate } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne } from 'typeorm';

export enum TaskTypes {
    MOST_RELEVANT = "MOST_RELEVANT",
    NOT_COMPLETED = "NOT_COMPLETED",
    COMPLETED = "COMPLETED"
}


@Entity()
@ObjectType()
export class Task extends BaseEntity{

    @Field((() => ID))
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true, nullable: false})
    title: string

    @Field()
    @CreateDateColumn()
    taskCreatedAt: Date

    @Field({nullable: true})
    @UpdateDateColumn({default: null, nullable: true})
    completedAt: Date

    @Field({nullable: true})
    @Column({nullable: true})
    expirationDate: Date

    @Field(() => String)
    @Column({nullable: true})
    description: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.tasks, {eager: true})
    user: User;

    constructor(_task: Partial<Task>){
        super()
        Object.assign(this, _task);
    }

    
}

export type TaskType = Task

export const validateTask = (_task: Partial<Task>) =>{
    const task = new Task(_task);
    return validate(task)        
}


