import { TimersDataType } from "../../shared/types/timerDataTypes";

export const getTimers = ():TimersDataType| null  =>{
    const storedTimers= localStorage.getItem('timers');
    if(storedTimers){
        const parsedTimers: TimersDataType = JSON.parse(storedTimers);
        return parsedTimers;
    }else{
        return null;
    }
}