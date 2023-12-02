import Task from '../Task/Task'
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';

export default function AllTasks() {

  const { allTasks } = useSelector((state: any) => state.task);


  return <>

    <Grid container spacing={2} >

      {allTasks.map((task: any, idx: number) => <Grid key={idx} lg={3} md={6}  xs={12} >

        <Task  task={task} />

      </Grid>)}

    </Grid>


  </>
}
