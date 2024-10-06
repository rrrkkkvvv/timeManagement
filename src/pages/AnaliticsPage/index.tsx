import { useEffect, useState } from 'react';
import { TimersDataType } from "../../shared/types/timerDataTypes";
import { formatTime } from '../../utils/formatTime';
import { getValueFromObj } from '../../utils/getValueFromObj';
import TimeChart from '../../feautures/ChartTimer';


const monthNames:{
    [monthNum:string]: string
} = {
    '0':"January",
    '1': "February",
    '2': "Marth",
    '3': "April",
    '4': "May",
    '5': "June",
    '6': "July",
    '7': "August",
    '8': "September",
    '10': "October",
    '9': "November",
    '11': "December"
}
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
    
    const getMonths = (timerTitle: string)=>{
            const months = Object.keys(timersData[timerTitle].years[currentYearFilter]);
            const monthsTitles: string[] = [];
            months.map((month)=>{
                if( Object.keys(monthNames).includes(month)){
                    monthsTitles.push(monthNames[month] )
                }
            })

            return monthsTitles
    
    }

    const getYears = (timerTitle: string)=>{
        const years = Object.keys(timersData[timerTitle].years);

        return years
    }

    const getTimersData = (timerTitle: string)=>{
        
        const currentMonthData = timersData[timerTitle].years[currentYearFilter][currentMonthFilter];
        console.log(currentMonthData)
        return currentMonthData;
    }

    const getHeightByMax = (timerTitle:string, time: number)=>{
        const maxTime = Math.max(...Object.values(timersData[timerTitle].years[currentYearFilter][currentMonthFilter]));
        const heightPercent = time / (maxTime / 100) 
        if(heightPercent>=40){
            return heightPercent
        }
        return 40
    }

 

    return (
        <div className="analytics-page">
            <TimeChart timers={timersData}/>
            {
                getTimerTitles().map((timerTitle)=>(
                <div className='timers-analytics-wrapper'>
                    <div className="timer-title">{timerTitle}</div>
                    <div className="timers-data-header">
                    <select name="" id="">
                            {
                                
                                getYears(timerTitle).map((year)=>{ 
                                    getTimersData(timerTitle)
                                    return <option key={year}  onSelect={()=>setCurrentYearFilter(year)} >{year}</option>
                                }
                                )
                            }
                        </select>
                        <select name="" id="">
                            {
                                getMonths(timerTitle).map((month)=>{

                                    return <option key={month} onSelect={()=>setCurrentMonthFilter( getValueFromObj(monthNames, month)!)}>{month}</option>
                                }
                                )
                            }

                        </select>
                      
                    </div>
                    
                    <div className="timers-data-days">
                        <div className='data-blocks-wrapper'>
                            {
                                
                                Object.keys(getTimersData(timerTitle)).map((day)=>{
                                    
                                    let time = getTimersData(timerTitle)[day];

                                    return <div key={day} className="data-block" style={{
                                            height:`${getHeightByMax(timerTitle, time)}%`
                                        }}>
                                            <div className="time">
                                                {
                                                    formatTime(time)
                                                }
                                            </div>
                                            <div className="date">
                                                {`${day}.${currentMonthFilter}.${currentYearFilter}`}
                                            </div>
                                        </div>
                                })
                            }
                        </div>
                    </div>
    
                </div>
                ))
            }
        
        </div>
    );
};

export default AnalyticsPage;
