import { TimerType } from "../../entities/Timer/types";

export const getTimers = ():TimerType[]  =>{
    const storedTimers= localStorage.getItem('timers');
    if(storedTimers){
        const parsedTimers = JSON.parse(storedTimers);
        const result: TimerType[]  = [];
        
        Object.keys(parsedTimers).forEach((title)=>{
            result.push({title: title, time:0, isStarted: false})
        })
        // console.log(parsedTimers)
        return result;
    }else{
        return [];
    }
}