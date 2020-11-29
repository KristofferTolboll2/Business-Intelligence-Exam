import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTaskInput {

    @Field(() => ID)
    taskId: number;

}