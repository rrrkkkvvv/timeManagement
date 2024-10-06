import { combineReducers } from "@reduxjs/toolkit";
import timerSliceReducer from "../entities/Timer/model/timerSlice";
// import ordersReducer from "./slices/orders/";
// import popUpReducer from "./slices/popUp/";
// import loginReducer from "./slices/login/";
// import themeReducer from "./slices/theme/";
// import baseApi from "../api/baseApi";

    
export const rootReducer = combineReducers({
    timers: timerSliceReducer,
    // popUp: popUpReducer,
    // login: loginReducer,x
    // themes: themeReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
});