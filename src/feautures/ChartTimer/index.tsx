import {  Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { TooltipItem } from 'chart.js'; 
import { formatTime } from '../../utils/formatTime';
import { TimersDataType } from '../../shared/types/timerDataTypes';

type TimeChartType = {
  timers: TimersDataType
}
const TimeChart = ({timers}:TimeChartType) => {

const data = {
    labels: Object.keys(timers),
    datasets: [
      {
        data: Object.keys(timers).map((timerTitle)=>timers[timerTitle].totalTime), 
        borderWidth: 1,
        
      },
    ],
};

  const options = {
    responsive: true,
    plugins: {
      legend:{
        labels:{
          font:{
            size: 20,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {             
            return formatTime(tooltipItem.raw as number);
          },
        },
      },
    },
  };

  
  return (
    <div className='time-pie-wrapper' >
      <Pie className='time-pie' data={data} options={options} />
    </div>
  );
};

export default TimeChart;
