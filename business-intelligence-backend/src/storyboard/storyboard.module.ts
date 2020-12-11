import { Module } from '@nestjs/common';
import { StoryboardController } from './storyboard.controller';
import { StoryboardService } from './storyboard.service';

@Module({
    imports: [],
    controllers: [StoryboardController],
    providers: [StoryboardService],
})
export class StoryboardModule {};