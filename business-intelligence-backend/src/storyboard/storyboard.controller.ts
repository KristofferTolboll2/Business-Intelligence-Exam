import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';
import { Node, Link} from './storyboard.service'


const filePath: string = __dirname + "/mental-illness-data/node-data1.json"
@Controller('storyboard')
export class StoryboardController {
    constructor(private readonly storyboardService: StoryboardService){}

    @Get('/getData') 
    async getData(){
    try {
    const data = await this.storyboardService.readFileData(filePath);
    return data
    } catch(error){
        console.error(error)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}

    @Get('/generateData')
    generateData(){
        const response = this.storyboardService.writeFileData(filePath)
        console.log(response)
        return response;
    }
}