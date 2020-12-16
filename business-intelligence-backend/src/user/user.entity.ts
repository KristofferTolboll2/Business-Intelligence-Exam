import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator'
import { DataProvider } from 'src/data-provider/dataProvider.entity';
import { CreateTaskInput } from 'src/task/inputs/createTask.input';
import { Task } from 'src/task/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';

export enum Goal {
    MENTAL_HEALTH = 'MENTAL_HEALTH',
    PUNCTUAL = 'PUNCTUAL',
    MEET_PEOPLE = 'MEET_PEOPLE',
}

@Entity()
@ObjectType()
export class User extends BaseEntity{

    @Field((() => ID))
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    firstName: string;

    @Field(() => String)
    @Column()
    lastName: string;

    @Field(() => String)
    @Column({unique: true, nullable: false})
    username: string;

    @Field(() => String)
    @Column()
    biography: string;

    @Field(() => Number)
    @Column()
    age: number;

    @Field(() => Goal)
    @IsEnum(Goal)
    @Column('text')
    goal: Goal 

    @Field(type => [Task])
    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @OneToOne(() => DataProvider, {cascade: true, eager: true})
    @JoinColumn()
    dataProvider: DataProvider;



}
