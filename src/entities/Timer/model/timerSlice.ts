import { createSlice } from "@reduxjs/toolkit";
import { TimerType } from "../types";
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTimers } from "../../../utils/LC/getTimersFromLC";

type initialStateType = {
    timers:TimerType[],
    lastStartedTimerId: number | null
}

const initialState:initialStateType =  {
    timers: getTimers(),
    lastStartedTimerId: null
} ;
    

const timerSlice = createSlice({
    name: "timers",
    initialState: initialState,
    reducers:{
        addTimer: (state, action: PayloadAction<{title: string}>)=>{
            if(action.payload.title.trim() !== ""){
                state.timers.push({
                    title: action.payload.title,
                    time: 0,
                    isStarted: false,
                })
            }
        },
        startTimer: (state, action: PayloadAction<{index: number}>)=>{
            state.timers[action.payload.index].isStarted = true;
            state.lastStartedTimerId = action.payload.index;

        },
        stopTimer: (state, action: PayloadAction<{index: number}>)=>{
            state.timers[action.payload.index].isStarted = false
        },
        resetTimer: (state, action: PayloadAction<{index: number}>)=>{
            state.timers[action.payload.index].isStarted = false;
            state.timers[action.payload.index].time = 0;
        },
        updateTimer: (state, action: PayloadAction<{index: number, newTime:number}>)=>{
            state.timers[action.payload.index].time = action.payload.newTime;

        }
    },
    selectors:{
        selectTimers: (state)=>state.timers,
        selectLastStatedTimerId: (state)=>state.lastStartedTimerId

    }
})

export const {addTimer, resetTimer, startTimer, stopTimer, updateTimer, } = timerSlice.actions;
export const {selectTimers, selectLastStatedTimerId} = timerSlice.selectors
const timerSliceReducer = timerSlice.reducer
export default timerSliceReducer;