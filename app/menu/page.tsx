import { Box, Button, Card, Dialog, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import Image from 'next/image'
import SelectMenuItem from './components/SelectMenuItemBtn'
import { MenuItem } from '@prisma/client'
import SelectBtn from './components/SelectMenuItemBtn'
import SelectMenuItemBtn from './components/SelectMenuItemBtn'

const page = async() => {
    const menuitems = await prisma.menuItem.findMany();
  return (
    <>
    <Grid columns={{initial:'1', xs:'2', md:'3'}} gapX='1' gapY='8' className='p-8' justify="center"align="center">
        {menuitems.map(menuitem => (
            <Box width={{ xs: '40vw', md: '30vw'  }} key={menuitem.id} maxWidth={{xs: '40vw', md: '30vw', lg: '25vw'}}>
            <Card>
                <Flex  direction='column'>
                    <Image src="/food.jpg" alt='food' layout='responsive' width='260' height="220" />
                    <Box className='bg-white'>
                        <Box className='h-48'>
                        <Text as="div" className='text-2xl text-BlackRussian'>{menuitem.name} ሰላጣ</Text>
                        <Text as='div'>{menuitem.description}</Text>
                        </Box>
                        <Flex justify='between'>
                           <SelectMenuItemBtn item={menuitem} />
                            <Text>{menuitem.price.toString() + " Rwf"}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
            </Box>
        ))}
    </Grid>
    
    </>
  )
}


export default page

