export type DayData = {
    [day: string]: number; 
};

// export type monthStrs = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |'10' | '11';
export type MonthData = {
    [month: string]: DayData;
};
  
export type YearData = {
    [year: string]: MonthData; 
};
  
export interface TimerAnalytics {
    totalTime: number;
    years: YearData; 
}
  
export interface TimersDataType {
    [timerTitle: string]: TimerAnalytics; 
}
  
//   example
//   const timersData: TimersData = {
//     "Work Timer": {
//       totalTime: 15000,
//       years: {
//         "2024": {
//           "1": {
//             "1": 6000,
//             "14": 3000
//           },
//           "2": {
//             "12": 1000,
//             "14": 5000
//           }
//         }
//       }
//     },
//     "Study Timer": {
//       totalTime: 20000,
//       years: {
//         "2024": {
//           "1": {
//             "10": 10000,
//             "11": 5000
//           },
//           "2": {
//             "15": 5000
//           }
//         }
//       }
//     }
//   };
  