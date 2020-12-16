import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DataProviderController } from './dataProvider.controller';
import { DataProvider } from './dataProvider.entity';
import { DataProviderService } from './dataProvider.service';

@Module({
    imports: [ TypeOrmModule.forFeature([DataProvider, User]),
        HttpModule, ConfigModule],
    controllers: [DataProviderController],
    providers: [DataProviderService],
})
export class DataProviderModule {};