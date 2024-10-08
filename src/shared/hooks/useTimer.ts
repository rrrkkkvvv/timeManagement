import { useEffect, useRef } from "react";
import { TimerType } from "../../entities/Timer/types";


export const useTimer = (timer: TimerType, updateTimer: (time:number)=>void) => {
    const intervalRef = useRef<number | undefined>(undefined);

    
    useEffect(()=>{
        if(timer.isStarted){

        intervalRef.current = window.setInterval(()=>{
                updateTimer(timer.time + 1);
        }, 1000);
    
        }else if(!timer.isStarted && timer.time === 0){
            clearInterval(intervalRef.current);
        }
        return ()=> clearInterval(intervalRef.current);
    }, [timer.isStarted, timer.time, updateTimer]);

    return timer;

}