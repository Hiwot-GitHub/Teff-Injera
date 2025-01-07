import { Avatar, Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { BsCupStraw } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";

const Dashboard = () => {
    const [selectedRange, setSelectedRange] = useState("Today");
  return (
    <div className='bg-green-50 m-4'>
        <div className='flex w-full justify-between'>
        <div><h5>Dashboard</h5><p>Welcome to Teff-Injera Admin!</p></div>
        <div><Button variant='soft'>Filter by Date</Button></div>
        </div>

        <Grid columns={{initial: "2", md: "4"}} gap="3" py="3">
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
        <Grid columns={{initial: "1", md: "2"}} gap="3" py="3">
            <Box height="192px" maxWidth="400px">
                <Card>
                  <Grid columns="1" rows="5" gap="3">
                    <div className='flex justify-between'>
                        <div><p>Order Summary</p><Text size="1">visual summary</Text></div>
                        <div className='flex h-12 '>
                            {
                                ["Monthly", "Weekly", "Today"].map((range) => (
                                    <Button key={range} size="1"
                                    onClick={() => setSelectedRange(range)}
                                    className={`px-4 py-2 rounded-md ${
                                      selectedRange === range
                                        ? "bg-white text-black "
                                        : "bg-green-50 hover:bg-green-50 text-black"
                                    }`}
                                  >{range}</Button>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex w-full bg-green-100 justify-between align-middle h-8'>
                        <div className='flex w-8 h-8 bg-green-500 text-white justify-center items-center'>
                        <Text weight="bold">25</Text></div><Text className='text-black'>New Orders</Text>
                        <div className='w-1 h-1 rounded-full bg-green-500 '></div>
                    </div>
                    <div className='flex gap-2'>
                        <Card>
                            <Text as='div'>25</Text>
                            <Text>On Delivery</Text>
                        </Card>
                        <Card>
                            <Text as='div'>60</Text>
                            <Text>Delivered</Text>
                        </Card>
                        <Card>
                            <Text as='div'>7</Text>
                            <Text>Canceled</Text>
                        </Card>
                    </div>
                 </Grid>
                </Card>
            </Box>
            <Box height="192px" maxWidth="400px"><Card></Card></Box>
        </Grid>
    </div>
  )
}

export default Dashboard