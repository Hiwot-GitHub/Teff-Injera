import prisma from '@/prisma/client'
import { Blockquote, Box, Card, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import Image from 'next/image'
import SelectMenuItemBtn from './components/SelectMenuItemBtn'
import { Metadata } from 'next'
import { MenuItem } from '@prisma/client'

export const metadata: Metadata = {
    title:'Teff Injera-Menu',
    description: 'order online premium Ethiopian cuisine cooked with fresh, high quality  ingredients and home paced cooking method',
    keywords:'Ethiopian cuisines,Eritrean food vegiterian platter, meat combination  '
  }

 
  async function getMenuItems() {
    const res = await fetch('https://teff-injera.app/api/menuitem', { next: { revalidate: 43200 } });
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
      const data: MenuItem[] = await res.json()
    return data;
  }


  const MenuPage = async ()=> {
    const menuitems = await getMenuItems();

  return (
    <>
    <Grid columns={{initial:'1', xs:'2', md:'3'}} gapX='1' gapY='8' className='p-8' justify="center"align="center">
        {menuitems.map(menuitem => (
            <Box width={{ xs: '40vw', md: '30vw'  }} key={menuitem.id} maxWidth={{xs: '40vw', md: '30vw', lg: '25vw'}}>
            <Card>
                <Flex  direction='column'>
                    <Image src={menuitem.image_url} alt='Ethiopian cuisine' layout='responsive' width='220' height="160" />
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


export default MenuPage

