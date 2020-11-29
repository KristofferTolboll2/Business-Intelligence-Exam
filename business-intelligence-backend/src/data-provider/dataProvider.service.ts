import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios'
import { RedisService } from 'nestjs-redis';
import { TernaryAnswerOptions, BinaryAnswerOptions } from './dto/AnswerOptions'
import { promisify } from 'util'

interface Question {
    question: string, answerOptions: any[]
}

@Injectable()
export class DataProviderService{
    constructor(private readonly httpService: HttpService,
                private readonly configService: ConfigService,
                private readonly redisService: RedisService){}


    async getColumns(){
        const flaskUrl: string = this.configService.get<string>('FLASK_SERVER_URL');
        const response = await axios.get(`${flaskUrl}/columns`)
        return response.data
    }

    async createQuestions({offset = 0,  limit = 10}: {offset: number, limit: number}){

        const {data, description} = await this.getColumns();
   

        const cachedQuestionEntries = await this.getQuestions(description);
        console.log(`they are ${cachedQuestionEntries} `)
        if(!cachedQuestionEntries){
        console.log('nothing')
        const questionEntries = data.map(entry => ({question: entry[0], answerOptions: this.encodeAnswerOptions(entry[2]?.original_labels)}))
        this.saveQuestions(questionEntries, description.name)
        return questionEntries.slice(offset, limit);
        }
        
        return cachedQuestionEntries.slice(offset, limit);
    }


    async getQuestions(key: string): Promise<Question[]>{
        const client = this.redisService.getClient();
        const getAsync = promisify(client.get).bind(client);
        return await getAsync(key).then(data =>{
            if(!data) return null
            return JSON.parse(data)
        }).catch(err =>{
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        })
}

    async saveQuestions(_data: any, key: string){
        const client = await this.redisService.getClient();
        
        /**
         * 
         */
        //TODO MAKE FUNCTION ASYNC!!!
        //const getAsync = promisify()
        client.get(key, (err, data) =>{
            if(err || data == null){
                console.log('set')
                client.set(key, JSON.stringify(_data));
            }else{
                console.log('not set')
                return data
            }
        })
    }



    private encodeAnswerOptions(answerOptions: any[]){
        if((answerOptions.includes(1) && answerOptions.includes(2) && answerOptions.includes(3)) || 
            ( (answerOptions.includes("Yes") && answerOptions.includes("No") && ((answerOptions.includes("Maybe") || answerOptions.includes("I don't know") 
            || answerOptions.includes('I am not sure') )) ))){
            return TernaryAnswerOptions
        }else if(answerOptions.includes(0), answerOptions.includes(1)){
            return BinaryAnswerOptions
        }
        return answerOptions
}

}