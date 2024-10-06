import { TimerPropsType } from "./types";
import { formatTime } from "../../utils/formatTime";
import { useAppDispatch } from "../../store/store";
import { resetTimer, startTimer, stopTimer, updateTimer } from "./model/timerSlice";
import { useEffect, useRef } from "react";

const Timer = ({
    index,
    timer
}: TimerPropsType) => {
    const dispatch = useAppDispatch();
  
    const { isStarted, time, title } = timer;
    const timeRef = useRef(time);

    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    
    useEffect(() => {
        let interval: number | undefined;

        if (isStarted) {
            interval = window.setInterval(() => {
                dispatch(updateTimer({ index: index, newTime: timeRef.current + 1 }));
            }, 1000);
        } 

        return () => {
            if (interval) clearInterval(interval);  
        };
    }, [isStarted, index, dispatch]); 


    return (
        <div className="timer">
            <div>{title}</div>
            <div>{formatTime(time)}</div>
            <div>
                {!isStarted ? (
                    <button onClick={() => dispatch(startTimer({ index }))}>Start</button>
                ) : (
                    <button onClick={() => dispatch(stopTimer({ index }))}>Stop</button>
                )}
                <button onClick={() => dispatch(resetTimer({ index }))}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;
