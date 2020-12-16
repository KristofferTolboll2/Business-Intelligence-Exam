import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DataProvider extends BaseEntity{


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    surveyPrediction: number;

    constructor(dataProvider: Partial<DataProvider>){
        super()
        Object.assign(this, dataProvider)
    }

}