import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataProviderModule } from './data-provider/dataProvider.module';
import { RedisModule} from 'nestjs-redis'
import { url } from 'inspector';
import { StoryboardModule } from './storyboard/storyboard.module';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
    autoSchemaFile: "schema.gql",
    buildSchemaOptions: {
      dateScalarMode: 'isoDate'
    }
  }),
  DataProviderModule,
  TaskModule,
  UserModule,
  StoryboardModule,
  TypeOrmModule.forRootAsync({
    useFactory: () =>({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'lpadmin',
    database: 'postgres',
    password: 'secretsauce',
    entities: [User, Task],
    synchronize: true
    })
  }),
  RedisModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      url: configService.get<string>('REDIS_URL')
    }), inject: [ConfigService]
  }),
 ],
  controllers: [AppController],
  providers: [AppService, ConfigModule],
})
export class AppModule {}
