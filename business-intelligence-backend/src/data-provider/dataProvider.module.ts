import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataProviderController } from './dataProvider.controller';
import { DataProviderService } from './dataProvider.service';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [DataProviderController],
    providers: [DataProviderService],
})
export class DataProviderModule {};