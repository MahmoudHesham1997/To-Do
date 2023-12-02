import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { ITask } from '../../Interfaces/Task'
import { useDispatch } from 'react-redux';
import { deleteTask, handleTaskToUpdate } from '../../Redux/Slices/TaskSlice';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import  AssignmentTurnedInIcon  from '@mui/icons-material/AssignmentTurnedIn';


export default function Task({ task }: { task: ITask }) {



    const dispatch = useDispatch();

    function handleDelete(id: string) {

        dispatch(deleteTask(id));

    }

    function handleUpdate() {

        dispatch(handleTaskToUpdate(task))

    }


    return <>

        <Card sx={{ backgroundColor: task.color  }} >

            <CardContent>

                <AssignmentTurnedInIcon sx={{ fontSize: '35px' , color: "var(--main-color)" , m: '10px auto' , display: 'block'  }} />

                <Typography sx={{ mt: 2 , textAlign: 'center' }} variant="body2">
                    {task.name}.
                </Typography>

                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    {task.date}
                </Typography>

            </CardContent>

            <CardActions>
                <Button color='success' onClick={handleUpdate} size="small">
                    <AutoFixHighIcon />
                </Button>
                <Button color='error' onClick={() => { handleDelete(task.id) }} size="small">
                    <DeleteIcon />
                </Button>
            </CardActions>
        </Card>


        {/* <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity={ type } sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar> */}

    </>
}
