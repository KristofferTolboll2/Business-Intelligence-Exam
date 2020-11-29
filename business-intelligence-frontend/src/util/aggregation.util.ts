import { BaseTask } from '../api/graphql/task.api';
import moment, { Moment } from 'moment'


export const aggregateTasks = (tasks: BaseTask[]) =>{
        
        const sortedTasks: BaseTask[] = sortDateArray([...tasks]);
       return sortedTasks.reduce((acc: any, curr: BaseTask) =>{
        const expirationDate = moment(Date.parse(curr.expirationDate)).format('LL')
        console.log(curr)
        if(expirationDate in acc){
            console.log(curr.completedAt)
            curr.completedAt === null ? ++acc[expirationDate]["notCompleted"]  : ++acc[expirationDate]["completed"] 
         }else{
             acc[expirationDate] = curr.completedAt === null ? {"notCompleted": 1, "completed": 0} : {"notCompleted": 0, "completed": 1}
         }
         return acc
       }, {})

}

export const displayStringValue =(value: string): string =>{
    if(value.split("_").length > 1){
        const [partOne, partTwo] = value.split("_");
        return `${partOne.charAt(0) + partOne.slice(1).toLowerCase()} ${partTwo.charAt(0) + partTwo.slice(1).toLocaleLowerCase()}`;
    }else{
        return value.charAt(0) + value.slice(1).toLowerCase()
    }
}


export const sortDateArray = (arr: BaseTask[]) =>{
    console.log(arr)
 return arr.sort((a, b) =>{
     console.log(moment(b.expirationDate).unix())
     return moment(a.expirationDate).unix() - moment(b.expirationDate).unix()
 })   
}