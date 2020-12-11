const fs = require('fs')
import { Injectable } from "@nestjs/common";
import { diseases } from './mental-illness-data/diseases'

export interface Node {
    id: string, group: number
}

export interface Link {
    source: string, target: string, value: number
} 

@Injectable()
export class StoryboardService {
    constructor(){}



    generateData() {
    const nodes: Node[] = diseases.map(disease =>{
        return  {id: disease, group: 4}
    })
    const links: Link[] = diseases.map(disease =>{
        const index = Math.floor(Math.random() * diseases.length)
        const target = disease === diseases[index] ? diseases[index] : diseases[index]
        console.log(target)
        return {source: disease, target, value: Math.floor(Math.random() * 10)}
    })
    return [nodes, links]

    }

    writeFileData(filePath: string){
        const [nodes, links] = this.generateData()
        const data = {nodes, links};
        console.log(data)
        try{
        fs.open(filePath, 'r', (err, fd) =>{
            if(err){
                return fs.writeFileSync(filePath, JSON.stringify(data), {flag: 'wx'});
            }else{
                console.log('file existss')
            }
        })
        return false
        }catch(error){
            throw (error)
        }
    }

    readFileData(filePath: string) {
        console.log(filePath)
        return new Promise((resolve, reject) =>{
        fs.readFile(filePath, 'utf-8', (err, data) =>{
            if(err){
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
    }
}