import { Avatar, Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes'
import React from 'react'
import { BsCupStraw } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";

function Dashboard() {
  return (
    <div className='bg-green-50 m-4'>
        <div className='flex w-full justify-between'>
        <div><h5>Dashboard</h5><p>Welcome to Teff-Injera Admin!</p></div>
        <div><Button variant='soft'>Filter by Date</Button></div>
        </div>

        <Grid columns={{initial: "2", md: "4"}}>
           <Box height="64px" maxWidth="200px">
            <Card>
                <Flex gap="3" align="center">
                    <Avatar
				      size="3"
				      radius="full"
				     fallback={
                        <Box width="24px" height="24px">
                            <BsCupStraw />
                        </Box>
                     }
                    />
			   <Box>
				<Text as="div" size="2" weight="bold">56</Text>
				<Text as="div" size="2" color="gray">Total Menu</Text>
			   </Box>
		       </Flex>
	        </Card>
    
         </Box>

         <Box height="64px" maxWidth="200px">
            <Card>
                <Flex gap="3" align="center">
                    <Avatar
				      size="3"
				      radius="full"
				     fallback={
                        <Box width="24px" height="24px">
                            <BsCurrencyDollar />
                        </Box>
                     }
                    />
			   <Box>
				<Text as="div" size="2" weight="bold">126k</Text>
				<Text as="div" size="2" color="gray">Total Revenue</Text>
			   </Box>
		       </Flex>
	        </Card>
    
         </Box>

         
         <Box height="64px" maxWidth="200px">
            <Card>
                <Flex gap="3" align="center">
                    <Avatar
				      size="3"
				      radius="full"
				     fallback={
                        <Box width="24px" height="24px">
                            <GrNotes />
                        </Box>
                     }
                    />
			   <Box>
				<Text as="div" size="2" weight="bold">179</Text>
				<Text as="div" size="2" color="gray">Total Orders</Text>
			   </Box>
		       </Flex>
	        </Card>
    
         </Box>

         
         <Box height="64px" maxWidth="200px">
            <Card>
                <Flex gap="3" align="center">
                    <Avatar
				      size="3"
				      radius="full"
				     fallback={
                        <Box width="24px" height="24px">
                            < MdPeopleAlt />
                        </Box>
                     }
                    />
			   <Box>
				<Text as="div" size="2" weight="bold">65</Text>
				<Text as="div" size="2" color="gray">Total Customers</Text>
			   </Box>
		       </Flex>
	        </Card>
    
         </Box>

        </Grid>
    </div>
  )
}

export default Dashboard