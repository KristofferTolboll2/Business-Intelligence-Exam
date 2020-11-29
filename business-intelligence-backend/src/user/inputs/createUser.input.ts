import { Field, InputType, Int } from "@nestjs/graphql";
import { Goal } from "../user.entity";


@InputType()
export class CreateUserInput {

    @Field()
    readonly username: string;

    @Field()
    readonly firstName: string;

    @Field()
    readonly lastName: string;

    @Field()
    readonly biography: string;

    @Field(() => Int)
    readonly age: number;

    @Field(() => Goal)
    readonly goal: Goal;


}