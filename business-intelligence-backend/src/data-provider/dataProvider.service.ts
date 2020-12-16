import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios'
import { RedisService } from 'nestjs-redis';
import { TernaryAnswerOptions, BinaryAnswerOptions } from './dto/AnswerOptions'
import { promisify } from 'util'
import { InjectRepository } from "@nestjs/typeorm";
import { DataProvider } from "./dataProvider.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

interface Question {
    question: string, answerOptions: any[]
}

@Injectable()
export class DataProviderService{
    constructor(
        @InjectRepository(DataProvider)
                private readonly dataProviderRepository: Repository<DataProvider>,
        @InjectRepository(User)
                private readonly userRepository: Repository<User>,
        private readonly httpService: HttpService,
                private readonly configService: ConfigService,
                private readonly redisService: RedisService
    ){}


    async getSurveyAnswer(userId: number): Promise<DataProvider>{
        try{
            const user: User = await this.userRepository.findOne({id: userId});
            console.log(user.dataProvider)
            return user.dataProvider
        }catch(error){
            throw error
        }
    }

    async getColumns(){
        const flaskUrl: string = this.configService.get<string>('FLASK_SERVER_URL');
        const response = await axios.get(`${flaskUrl}/columns`)
        return response.data
    }

    async createQuestions({offset = 0,  limit = 100}: {offset: number, limit: number}){

        const {data, description} = await this.getColumns();
   
        const cachedQuestionEntries = await this.getQuestions(description);
    
        if(!cachedQuestionEntries){
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

    private decodeAnswerOptions(answerOptions: any[], questionResponses: any[]){
        const parsedAnswers =  answerOptions.map(answer =>{
               const expectedAnswer = parseInt(answer)
               if(isNaN(expectedAnswer)){
                return 1
               }
                return expectedAnswer
        })
        return  questionResponses.map((entry, index) =>{
            return [entry[1], parsedAnswers[index]]
        })
    }

    private toDataObject(decodedAnswers: any[]){
        let obj = {}
        decodedAnswers.map((entry, index) =>{
            const key = entry[0]
            const value = entry[1]
            obj[key] = value
        })
        return obj
    }

    async submitSurvey(answers: any){
        const flaskUrl: string = this.configService.get<string>('FLASK_SERVER_URL');
        const questionResponse = await (await axios.get(`${flaskUrl}/columns`)).data
        const decodedAnswersOptions: any[] = this.decodeAnswerOptions(answers, questionResponse.data);
        const dataObject = this.toDataObject(decodedAnswersOptions);
        const response = await this.httpService.post(`${flaskUrl}/predict`, dataObject).toPromise();
        const { prediction } = response.data
        const user = await this.userRepository.findOne({id: 1});
        const dataProviderEntity = new DataProvider({
            surveyPrediction: prediction[0]
        })
        user.dataProvider = dataProviderEntity;
        user.save()
        console.log(prediction)
        return response.data;
    }

}