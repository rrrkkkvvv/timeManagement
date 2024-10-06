import { useEffect, useRef } from "react";
import Timer from "../../entities/Timer";
import CreateTimer from "../../feautures/CreateTimer";
import { useAppSelector } from "../../store/store";
import {  selectTimers } from "../../entities/Timer/model/timerSlice";
import { saveTimers } from "../../utils/LC/saveTimersInLC";

const MainPage = () => {
  // const [lastStartedTimerId, setLastStartedTimerId] = useState<number>();
  const timers = useAppSelector(selectTimers);

  const timersRef = useRef(timers);

  useEffect(() => {
    timersRef.current = timers;
  }, [timers]);


  useEffect(() => {
    const interval = window.setInterval(() => {
      saveTimers(timersRef.current); 
    }, 1000);
    
    return () => clearInterval(interval); 
  }, []); 

  return (
      <main>
        <div className="timers-wrapper">
          {timers.map((timer, i) => (
            <Timer index={i} timer={timer} key={i} />
          ))}
        </div>
        <CreateTimer />
      </main>
  );
};

export default MainPage;
