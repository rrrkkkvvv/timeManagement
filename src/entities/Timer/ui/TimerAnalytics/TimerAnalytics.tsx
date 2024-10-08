import { ChangeEvent, useEffect, useState } from "react";
import { DayData, TimersDataType } from "../../../../shared/types/timerDataTypes";
import { getValueFromObj } from "../../../../utils/getValueFromObj";
import { formatTime } from "../../../../utils/formatTime";



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

const TimerAnalytics = ({timerTitle, timersData}:{timerTitle: string, timersData: TimersDataType}) => {
    
    
    const [currentYearFilter, setCurrentYearFilter] = useState<string>("2024");
    const [currentMonthFilter, setCurrentMonthFilter] = useState<string>("8");
    
    const [monthsTitles, setMonthsTitles] = useState<string[]>([]);
    const [currentMonthData, setCurrentMonthData] = useState<DayData>({});
    

    const handleYearSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentYearFilter(event.target.value);  
    };
    const handleMonthSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {

        let val = getValueFromObj(monthNames, event.target.value);
        if(val){
            setCurrentMonthFilter(val);

        }
        
    };


    useEffect(()=>{
        getMonths()
        getTimersData()
    }, [currentMonthFilter, currentYearFilter])
    
    const getMonths = ()=>{
            const months = Object.keys(timersData[timerTitle].years[currentYearFilter]);
            const monthsTitles: string[] = [];
            months.map((month)=>{
                if( Object.keys(monthNames).includes(month)){
                    monthsTitles.push(monthNames[month] )
                }
            })
            setMonthsTitles(monthsTitles);
    
    }

    const getYears = ()=>{
        const years = Object.keys(timersData[timerTitle].years);

        return years
    }

    const getTimersData = ()=>{
        
        const currentMonthData = timersData[timerTitle].years[currentYearFilter][currentMonthFilter];
        setCurrentMonthData( currentMonthData);
    }

    const getHeightByMax = (time: number)=>{
        const maxTime = Math.max(...Object.values(timersData[timerTitle].years[currentYearFilter][currentMonthFilter]));
        const heightPercent = time / (maxTime / 100) 
        if(heightPercent>=40){
            return heightPercent
        }
        return 40
    }

    return ( 
        <div className='timers-analytics-wrapper'>
        <div className="timer-title">{timerTitle}</div>
        <div className="timers-data-header">
        <select name="" id="" onChange={handleYearSelectChange}>
                {
                    
                    getYears().map((year)=>{ 
                        return <option key={year}   >{year}</option>
                    }
                    )
                }
            </select>
            <select name="" id="" onChange={handleMonthSelectChange}>
                {
                    monthsTitles.map((month)=>{
                        return <option key={month} >{month}</option>
                    }
                    )
                }

            </select>
          
        </div>
        
        <div className="timers-data-days">
            <div className='data-blocks-wrapper'>
                {
                    
                    Object.keys(currentMonthData).map((day)=>{
                        
                        let time = currentMonthData[day];

                        return <div key={day} className="data-block" style={{
                                height:`${getHeightByMax( time)}%`
                            }}>
                                <div className="time">
                                    {
                                        formatTime(time)
                                    }
                                </div>
                                <div className="date">
                                    {`${day}.${parseInt(currentMonthFilter)+1}.${currentYearFilter}`}
                                </div>
                            </div>
                    })
                }
            </div>
        </div>

    </div>
    );
}
 
export default TimerAnalytics;