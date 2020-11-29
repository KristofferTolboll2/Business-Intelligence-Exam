import { Args, ResolveField, Resolver, Query, Mutation, ResolveProperty, Parent } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskInput } from "src/task/inputs/createTask.input";
import { Task } from "src/task/task.entity";
import { Arg } from "type-graphql";
import { Repository } from "typeorm";
import { CreateUserInput } from "./inputs/createUser.input";
import { UpdateUserInput } from "./inputs/updateUser.input";
import { User } from "./user.entity";
import { UserService } from "./user.service";



@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepsitory: Repository<User>,
    private readonly userService: UserService,
  ) {}


  @Query(() => [User])
  users(){
    return User.find()
  }


  @Mutation(() => User)
  //always use @Args instead of Arg
  async createUser(@Args("input") input: CreateUserInput): Promise<User>{
    console.log(input)
    try{ 
    const user = User.create(input);
    await user.save()
    return user
    }catch(error){
      console.log(error)
      throw new Error(error);
    }
  }

  
  @Query(() => User)
  async userById(@Args("id") id: string): Promise<User>  {
    return await User.findOne(id);
  }


  @Query(() => User)
  async userWithTasks(@Args("id") id: string): Promise<User> {
    const user = await this.userService.getUserByIdWithTasks(id);
    return user
  }

  @Mutation(() => User)
  async updateUser(@Args("id") id: string, @Args("input") input: UpdateUserInput){
  const user: User = await User.findOne(id);
  if(!user) throw new Error("User does not exists");
  Object.assign(user, input);
  await this.userRepsitory.save(user);
  return user
  }


}