import { Field, Float, InputType } from "@nestjs/graphql";
import { TaskTypes } from "../task.entity";


@InputType()
export class GetRelevantTasksInput {

    @Field(() => String!)
    userId: string;


    @Field(() => Float!)
    limit: number

    @Field(() => TaskTypes)
    type: TaskTypes

}