import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { DataProvider } from './dataProvider.entity';
import { DataProviderService } from './dataProvider.service';
import { mentalHealthIssuesTasks, nonMentalHealthIssues } from './task-recommendations/TaskRecommendations';

interface PredictionResponse {
    prediction: number[]
}

@Controller('dataprovider')
export class DataProviderController {
    constructor(private readonly dataProviderService: DataProviderService){}

    @Get('allColumns') 
    async getColumns(){
    try{
        const response = await this.dataProviderService.getColumns();
        return response
    }catch(error){
        console.error(error)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    @Get('survey/:userId')
    async getSurveyAnswers(@Param('userId') userId: number){
    try{
        const prediction: DataProvider  = await this.dataProviderService.getSurveyAnswer(userId);
            if(prediction.surveyPrediction === 1){
                return mentalHealthIssuesTasks
            }else if(prediction.surveyPrediction === 0){
                return nonMentalHealthIssues
            }else{
                return {}
            }
    }catch(error){
        console.error(error)
        throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
    }

    @Get('prediction/:userId')
    async getSurveyPrediction(@Param('userId') userId: number): Promise<DataProvider>{
        return await this.dataProviderService.getSurveyAnswer(userId);
    }


    @Get('questions')
    async getQuestions( @Query('offset') offset: number, @Query('limit') limit: number){
        try{
            const questions = await this.dataProviderService.createQuestions({offset, limit});
            return questions;
        } catch(error){
            console.error(error.message)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('submit')
    async submitSurvey(@Body() body): Promise<PredictionResponse>{
        try{
        const data = await this.dataProviderService.submitSurvey(body);
        console.log(data)
        return data
        }catch(error){
        console.error(error)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

}