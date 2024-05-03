import { Box, Heading,Text,Flex, Avatar, Button, AspectRatio, Card } from "@radix-ui/themes";
import NavBar from "./NavBar";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <>
     <Box as="div" height="420px">
     <AspectRatio ratio={16 / 8 }>
  
      <img src="/carrotsalad.jpeg" alt='carrot salad'
     style={{
      objectFit: 'cover',
       width: '100%',
       height: '100%',
       borderRadius: 'var(--radius-2)',
     }} 
     />
    
     </AspectRatio>
     </Box>
    <Box className="z-50 ml-16" >
      
       <Card variant="ghost" size='3' className="top-[-28vh] sm:top-[-12vh] md:top-[4vh] lg:top-[16vh] absolute w-[20rem] h-[18rem] z-50 ml-2 border-b border-l border-t border-r "><Heading m="2">Welcome!</Heading>
       <Text size='4' as="div" className="mb-8 ">Teff Injera is Home based kitchen that serves delicious Ethiopian cuisine in Kigali, <strong>our Injera is made from 100% Teff flour</strong>.  </Text>
       
       <Button variant="soft" size='4' className="mt-20">
        <Link href="/menu">see menu</Link></Button>
       </Card>
       
       </Box>
       <Box as="div" className="t-">
       <Flex justify="between" className="z-50">
        <Box></Box>
        <Flex gapX="3" className=" z-50" >
        <Avatar size="8" src="/sils.jpeg" fallback="sils image" className="right-0"/>
        <Avatar size="8" src="/pot.jpeg" fallback="pot image"  />
        <Avatar size="8" src="/salad.jpeg" fallback="sils image"/>
        <Avatar size="8" src="/shiro.jpeg" fallback="sils image"/>
       </Flex>
       </Flex></Box>
    </>
  );
}