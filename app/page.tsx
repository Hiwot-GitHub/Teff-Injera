import { Box, Heading,Text,Flex, Avatar, Button, AspectRatio, Card } from "@radix-ui/themes";
import NavBar from "./NavBar";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "./components/sign-in";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:'Ethiopian cuisine',
  description: 'order Ethiopian food in Kigali, Rwanda',
  keywords:'Ethiopian restuarant,Eritrean food , Habesha restuarants Injera'
}
export default function Home() {
  return (
    <>
     <Box as="div" height="420px">
     <AspectRatio ratio={16 / 8 }>
  
      <img src="/Beyaynet.jpeg" alt='Beyaynetu'
     style={{
      objectFit: 'cover',
       width: '100%',
       height: '100%',
       borderRadius: 'var(--radius-2)',
     }} 
     />
    
     </AspectRatio>
     </Box>
    <Box className="z-50  ml-16 " >
      
       <Card variant="ghost" size='3' className="top-[-30vh] sm:top-[-14vh] md:top-[4vh] lg:top-[16vh] max-sm:w-[20rem] max-sm:h-[22rem]  w-[25rem] h-[20rem]  z-50 ml-2 border-b border-l border-t border-r "><Heading m="2">Welcome!</Heading>
       <Text size='4' as="div" className="mb-8 ">We are home based kitchen serving savory Ethiopian cuisine in Kigali.We deliver your orders to your preferred address. <strong>Our injera is made of 100% teff flour</strong>.  </Text>
       
       <Button variant="soft" size='4' className="mt-2">
      
        <Link href="/menu">see menu</Link></Button>
       </Card>
       
       </Box>
       <Box as="div" className="t-">
       <Flex justify="between" className="z-50">
        <Box></Box>
        <Flex gapX="3" className=" z-50" >
        <Avatar  src="/sils.jpeg" fallback="sils image" className="w-16 h-16 xs:w-24 xs:h-24 md:w-36 md:h-36 right-0"/>
        <Avatar  src="/pot.jpeg" fallback="pot image" className="w-16 h-16 xs:w-24 xs:h-24 md:w-36 md:h-36"  />
        <Avatar  src="/salad.jpeg" fallback="sils image"className="w-16 h-16 xs:w-24 xs:h-24 md:w-36 md:h-36" />
       </Flex>
       </Flex></Box>
   
       <Box className="border-t mt-8 p-8 mx-10">
       <Flex gapX="6">
        <a href="tel:0791348739" className="hover:text-green-500"><IoCall size={36} /></a>
        <a href="https://wa.me/+250791348739" className="hover:text-green-500"><FaWhatsapp size={36} /></a>
      </Flex>
       </Box>
    </>
  );
}