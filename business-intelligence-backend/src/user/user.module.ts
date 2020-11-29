import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { User } from './user.entity';
import { UserResolver } from './user.resolver'
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UserModule {}
