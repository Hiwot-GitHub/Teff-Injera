import { Blockquote, Box, Button, Card, Dialog, Flex, Grid, Separator, Text, TextField } from '@radix-ui/themes'
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
                        <Flex as='div' gap="2" align="center" className='md:text-2xl sm:text-xl py-2 '>
                        <Text >{menuitem.name}</Text>
                        <Separator orientation="vertical" /> 
                        <Text>{menuitem.amharicname}</Text>
                        </Flex>
                        <Box py='2' px='1'><Blockquote>{menuitem.description}</Blockquote></Box>
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

