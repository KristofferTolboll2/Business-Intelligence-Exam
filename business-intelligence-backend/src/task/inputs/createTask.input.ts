import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTaskInput {

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    user: string

    @Field()
    expirationDate: String;

}