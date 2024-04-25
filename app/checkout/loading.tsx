import { Box, Flex, Grid, Heading, TextField } from '@radix-ui/themes';
import React from 'react'
import Skeleton from 'react-loading-skeleton';

const LoadingCheckout = () => {
  return (
        <>
    
    <Grid columns={{initial: '1' , md: '2'}} gap='5' width='auto' className='sm: px-10'>
    <Box>
        <Heading as="h1" size="4"><Skeleton /></Heading>
        <Flex direction="column" gap="4">
            <Flex gapX="4px">
             <Box width='auto'>
                <Skeleton />
                <Skeleton />
                <Skeleton />
           </Box>
           <Box width='auto'>
                <Skeleton />
           </Box>
           </Flex>
           <Box className='w-[60%]'>
           <Skeleton />
            <Skeleton />
          </Box>
          <Box className='w-[60%]'>
          <Skeleton />
          </Box>
          <Box className='w-[60%]'>
           <Skeleton />           
          </Box>
          <Box className='w-auto'>
           <Skeleton />
          </Box>

</Flex>
    </Box>
    <Box>
    <Heading size='4' mb='4'><Skeleton /></Heading>
        <Flex gap='4'>
        <Skeleton />
        <Skeleton />
        </Flex>
       
        <Skeleton />
        <Heading size='1' mb='4'>Choose delivery time?</Heading>
        <Flex direction="column"gap="5" >
         <Box>
         <Skeleton />
      
       
        </Box>
        <Box>
            <Skeleton />
     
        </Box ></Flex>
        <Box>
        <Heading><Skeleton /></Heading>
        <Skeleton />
      
    
       
        </Box> 
       <Skeleton />
    </Box>
    </Grid>
    
    </>

  )
}

export default LoadingCheckout;