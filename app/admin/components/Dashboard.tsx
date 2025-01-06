import { Box, Button, Card, Grid } from '@radix-ui/themes'
import React from 'react'

function Dashboard() {
  return (
    <div className='bg-green-50 m-4'>
        <div className='flex w-full justify-between'>
        <div><h5>Dashboard</h5><p>Welcome to Teff-Injera Admin!</p></div>
        <div><Button variant='soft'>Filter by Date</Button></div>
        </div>

        <Grid columns={{initial: "2", md: "4"}}>
            <Box height="64px" maxWidth="200px"><Card></Card></Box>
            <Box height="64px" maxWidth="200px"><Card></Card></Box>
            <Box height="64px" maxWidth="200px"><Card></Card></Box>
            <Box height="64px" maxWidth="200px"><Card></Card></Box>
        </Grid>
    </div>
  )
}

export default Dashboard