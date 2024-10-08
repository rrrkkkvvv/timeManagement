import { TimerType } from "../../entities/Timer/types";
import { TimersDataType } from "../../shared/types/timerDataTypes";




export const saveTimers = (timers: TimerType[]) =>{
    const storedTimers= localStorage.getItem('timers');
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();


    if(storedTimers){
        const parsedTimers: TimersDataType = JSON.parse(storedTimers);

        timers.forEach((timer)=>{
            if(timer.isStarted){

                if(!parsedTimers[timer.title]){
                    parsedTimers[timer.title]  = { totalTime: 0, years: {} };
                }
                
                if(!parsedTimers[timer.title].years[year]){
                    parsedTimers[timer.title].years[year] = {};
                }
                if(!parsedTimers[timer.title].years[year][month]){
                    parsedTimers[timer.title].years[year][month] = {};
                }
                if(!parsedTimers[timer.title].years[year][month][day]){
                    parsedTimers[timer.title].years[year][month][day] = 0;
                }
                parsedTimers[timer.title].totalTime += 1;
                parsedTimers[timer.title].years[year][month][day] += 1;

            }

        });
        localStorage.setItem('timers', JSON.stringify(parsedTimers));
    }else{
        let timersToLC: TimersDataType = {}; 
        
        timers.forEach((timer) => {
   
            timersToLC[timer.title] = { totalTime: 0, years: {} };
            timersToLC[timer.title].years[year] = {};
            timersToLC[timer.title].years[year][month] = {};
            timersToLC[timer.title].years[year][month][day] = 0;
            
            timersToLC[timer.title].totalTime += timer.time;
            timersToLC[timer.title].years[year][month][day] += timer.time;
        });
    
        localStorage.setItem('timers', JSON.stringify(timersToLC));

    }

}