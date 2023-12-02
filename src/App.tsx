import { Container, Typography } from '@mui/material'
import React from 'react'
import Todo from './Components/Todo/Todo'
import AllTasks from './Components/AllTasks/AllTasks'

export default function App() {
  return <>


    <Typography
      variant='h1'
      sx={{
        textAlign: 'center',
        color: "var(--main-color)",
        fontSize: '4.5rem'
      }} >
      My Tasks to do
    </Typography>




    <Container maxWidth="md" >

      <Todo />

      <AllTasks />

    </Container>

      


  </>
}
