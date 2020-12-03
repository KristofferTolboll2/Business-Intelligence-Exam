import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DataProviderService } from './dataProvider.service';

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


    @Get('questions')
    async getQuestions( @Query('offset') offset: number, @Query('limit') limit: number){
        try{
            const questions = await this.dataProviderService.createQuestions({offset, limit});
            console.log(questions)
            return questions;
        } catch(error){
            console.error(error.message)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}