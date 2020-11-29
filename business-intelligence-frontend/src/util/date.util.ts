import { getAllByDisplayValue } from "@testing-library/react";
import { DateMetric } from "../components/dashboard/items/TaskChart";
import moment from 'moment';

export const getDaysAhead = (days: number): string => {
    let daysAhead: Date = new Date();
    daysAhead.setDate(daysAhead.getDate() + days);
    return convertToIsoFormat(daysAhead);
}

export const convertToIsoFormat = (date: Date): string =>{
    return date.toISOString().slice(0, 21);
}

export const setDateHandler = (type: DateMetric): string =>{
    switch(type) {
        case DateMetric.Daily:
             return getDaysAhead(1)
        case DateMetric.Weekly:
            return getDaysAhead(7)
        case DateMetric.Monthly:
            return getDaysAhead(30)
    }
}

export const parseDateToTable = (date: Date, withTimeLeft: boolean) =>{
    if(withTimeLeft){
        const diff = moment(date).diff(moment());
        const diffDays = moment.duration(diff).days();
        const diffHours = moment.duration(diff).hours();
        const diffMinutes = moment.duration(diff).minutes()
        if(diffDays > 0){
        return `${diffDays} Days ${diffHours} Hours and ${diffMinutes} left`;
        }else{
            return ` ${diffHours} Hours and ${diffMinutes} minutes left`;
        }
    }else{
        return moment(date).format('MM-DD : HH-MM').toString()
    }
}