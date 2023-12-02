import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../Interfaces/Task';



type state = {
    allTasks: ITask[],
    isUpdating: boolean;
    taskToUpdate: null | ITask;
}

const initialState: state = {
    allTasks: localStorage.getItem('allTasks')? JSON.parse( localStorage.getItem('allTasks')! ) : [],
    isUpdating: false,
    taskToUpdate: null,
}

const taskSlice = createSlice({
    name: 'task',

    initialState,

    /**
     * hint: difference between handleTaskToUpdate and editTask
     * 
     * handleTaskToUpdate is the inital step of the update that put 
     * the task data in the input field
     * 
     * editTask function is the last step to update the task data 
     */
    reducers: {
        addNewTask: (state, action) => {
            state.allTasks.push(action.payload);
            localStorage.setItem( 'allTasks', JSON.stringify( state.allTasks ) );
        },

        deleteTask: (state, action) => {
            const newData = state.allTasks.filter((task) => task.id !== action.payload);
            state.allTasks = newData;
            localStorage.setItem( 'allTasks', JSON.stringify( state.allTasks ) );

        },

        handleTaskToUpdate: (state, action) => {

            state.isUpdating = true;
            state.taskToUpdate = action.payload;

        },

        editTask: (state, action) => {
            

            state.isUpdating = false;
            state.taskToUpdate = null;

            const findIndex = state.allTasks.findIndex((task) => task.id === action.payload.id);
            if (findIndex !== -1){
                state.allTasks[findIndex] = action.payload.newValue;
                localStorage.setItem( 'allTasks', JSON.stringify( state.allTasks ) );

            }

            

        }

    }

});

export default taskSlice.reducer;

export const { addNewTask, deleteTask, handleTaskToUpdate, editTask } = taskSlice.actions;