import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './Slices/TaskSlice';

// the store is Provided in index.js around all the app
export const myStore = configureStore( {
    reducer: {
        task: taskReducer,
    }
} )