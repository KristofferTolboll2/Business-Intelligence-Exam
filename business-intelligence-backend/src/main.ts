import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { TaskTypes } from './task/task.entity';
import { Goal } from './user/user.entity';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  registerEnumType(Goal, {
    name: 'goal'
  })
  registerEnumType(TaskTypes, {
    name: 'taskType'
  })
  await app.listen(3000);
}
bootstrap();
