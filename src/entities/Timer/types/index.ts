export type TimerType = {
    title: string;
    isStarted: boolean;
    time:number
}

export type TimerPropsType =  {
    timer: TimerType;
    index: number;
}
  