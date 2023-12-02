import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import { useEffect } from 'react';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { addNewTask, editTask } from '../../Redux/Slices/TaskSlice';
import { useDispatch, useSelector } from 'react-redux'
import { ITask } from '../../Interfaces/Task';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useSnackbar } from '../../Hooks/useSnackbar/useSnackbar';
import { useForm, Controller } from 'react-hook-form';


const randomColors = [ "#80B3FF" , "#B6FFFA" , "#98E4FF" , "#3081D0" ];


export default function Todo() {

    const { open, showSnackbar, closeSnackbar, message, type } = useSnackbar();
    const { handleSubmit, control, formState: { errors } , setValue } = useForm();
    const dispatch = useDispatch();



    // a Flag to change the status from add to Edit
    const { taskToUpdate, isUpdating } = useSelector((state: any) => state.task);
    useEffect(() => {

        if (isUpdating && taskToUpdate) {
            setValue( "taskName" ,taskToUpdate.name);
        }

    }, [setValue, isUpdating, taskToUpdate])




    function getRandomBackground(){

        return  randomColors[Math.floor( Math.random() * randomColors.length )] ;

    }



    // Tasks operations 
    function onSubmit(data: any) {

        const task: ITask = {
            id: Math.random().toString(),
            name: data.taskName,
            date: (new Date()).toLocaleString(),
            color: getRandomBackground()
        };

        isUpdating ? updateTask(task) : addTask(task);

        clearInput()
    }

    function clearInput() {
        setValue( 'taskName' , "" );
    }

    function addTask(task: ITask) {

        dispatch(addNewTask(task));

        showSnackbar("success", "New Task Added successfully")

    }

    function updateTask(task: ITask) {

        dispatch(editTask({ newValue: task, id: taskToUpdate.id }));

        showSnackbar("success", `${taskToUpdate.name} has been updated successfully`);
    }

    return <>

        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} >

            <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '20px 0px', color: "var(--main-color)" }}>
                <AssignmentTurnedInIcon sx={{ mr: 1, my: 0.5 }} />


                <Controller

                    name="taskName"
                    control={control}
                    
                    // add many rules (validation) as you want inside the rules
                    // with the same stucture
                    rules={{ 
                        required: { message: "Task Name is required.", value: true } , 
                        minLength: { value: 3, message: "Task Name must be at least 3 characters." } 
                    }}

                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="taskName"
                            sx={{ width: '100%' }}
                            label="Task"
                            variant="standard"
                        />
                    )}

                />

                <Button type='submit' sx={{ color: "var(--main-color)", ':hover': { backgroundColor: 'unset' } }} variant='text' >

                    {isUpdating ? <EditNoteIcon /> : <AddTaskIcon />}

                </Button>

            </Box>

        </form>


        {/* Displaying validation to user depending on the error */}
        { errors['taskName']? <Alert severity="error"> { (errors['taskName'].message as string) } </Alert>  :  undefined }


        {/* The status of the operation has been done in a message */}
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity={type} sx={{ width: '100%' }}>
                {message}.
            </Alert>
        </Snackbar>

    </>
}
