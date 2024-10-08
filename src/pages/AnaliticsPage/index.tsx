import { useEffect, useState } from 'react';
import { TimersDataType } from "../../shared/types/timerDataTypes";
import { formatTime } from '../../utils/formatTime';
import { getValueFromObj } from '../../utils/getValueFromObj';
import TimeChart from '../../feautures/ChartTimer';
import TimerAnalytics from '../../entities/Timer/ui/TimerAnalytics/TimerAnalytics';


const AnalyticsPage = () => {
    const [timersData, setTimersData] = useState<TimersDataType | null>(null);
    
    const [currentYearFilter, setCurrentYearFilter] = useState<string>("2024");
    const [currentMonthFilter, setCurrentMonthFilter] = useState<string>("8");
    useEffect(() => {
        const storedTimers = localStorage.getItem('timers');
        if (storedTimers) {
            const parsedTimers: TimersDataType = JSON.parse(storedTimers);
            setTimersData(parsedTimers);
        }
    }, []);

    if (!timersData) {
        return <div className="analytics-page">No timers available</div>;
    }


    const getTimerTitles = ()=> Object.keys(timersData);
    

 

    return (
        <div className="analytics-page">
            <TimeChart timers={timersData}/>
            {
                getTimerTitles().map((timerTitle)=>(
                    <TimerAnalytics timerTitle={timerTitle} timersData={timersData} key={timerTitle}/>
                ))
            }
        
        </div>
    );
};

export default AnalyticsPage;
