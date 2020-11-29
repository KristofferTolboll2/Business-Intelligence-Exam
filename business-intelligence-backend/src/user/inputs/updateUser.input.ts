import { Field, InputType, Int } from "@nestjs/graphql";
import { Goal } from "../user.entity";


@InputType()
export class UpdateUserInput {

    @Field({nullable: true})
    username?: string;

    @Field({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    lastName?: string;

    @Field({nullable: true})
    biography?: string;

    @Field(() => Int, {nullable: true})
    age?: number;

    @Field(() => Goal, {nullable: true})
    goal?: Goal;


}