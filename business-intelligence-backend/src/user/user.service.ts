import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

    async getUserByIdWithTasks(id: string): Promise<User>{
      return await this.usersRepository.findOne(id, {
        relations: ['tasks'], 
      })
    }

}