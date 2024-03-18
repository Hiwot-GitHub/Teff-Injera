import { Box, Button, Card, Dialog, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import Image from 'next/image'
import SelectMenuItem from './components/SelectMenuItemBtn'
import AddToCart from './components/AddToCart'
import { MenuItem } from '@prisma/client'
import SelectBtn from './components/SelectMenuItemBtn'

const page = async() => {
    const menuitems = await prisma.menuItem.findMany();
  return (
    <>
    <Grid columns={{initial:'1', xs:'2', lg:'3'}} gap='3'className='p-16'>
        {menuitems.map(menuitem => (
            <Card key={menuitem.id}>
                <Flex  direction='column'>
                    <Image src="/food.jpg" alt='food' layout='responsive' width='260' height="220" />
                    <Box className='bg-white'>
                        <Box className='h-48'>
                        <Text as="div" className='text-2xl text-BlackRussian'>{menuitem.name} ሰላጣ</Text>
                        <Text as='div'>{menuitem.description}</Text>
                        </Box>
                        <Flex justify='between'>
                           <SelectBtn item={menuitem} />
                            <Text>{menuitem.price.toString() + " Rwf"}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        ))}
    </Grid>
    
    </>
  )
}

export default page

