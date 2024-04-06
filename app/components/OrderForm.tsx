'use client'
import { Box, Flex, TextField, Text, Grid, Heading, Button, DropdownMenu, Select, RadioGroup } from '@radix-ui/themes'
import React, { useContext, useState, useEffect } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import CartContext from '../CartContext';
import { useForm, Controller, useController } from "react-hook-form";
import { CreateOrderSchema } from '../validationSchema';
import axios from'axios';
import { useRouter } from 'next/navigation';


const OrderForm = () => {
    const {cart, total} = useContext(CartContext);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { register, handleSubmit, control } = useForm<typeof CreateOrderSchema>();
    const router = useRouter();

    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

const deliveryDates = {
  today: currentDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
  tomorrow: tomorrowDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
};



  
  return (
    <form onSubmit={handleSubmit(async(data) => {
    try {
      const formattedDeliveryTimeSlot = data._type.deliveryTimeSlot ? new Date(data._type.deliveryTimeSlot): undefined ;
       await axios.post('/api/order', {
        ...data,
        _type: {
          ...data._type,
          deliveryTimeSlot: formattedDeliveryTimeSlot
        },
       });
       router.push('/menu')
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    }
  )}>
    <Grid columns={{initial: '1' , md: '2'}} gap='5' width='auto' className='sm: px-10'>
    <Box>
        <Heading as="h1" size="4">Billing and Shipping</Heading>
        <Flex direction="column" gap="4">
            <Flex gapX="4px">
             <Box width='auto'>
                <Text as='label'>First Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root size="1" placeholder="First Name" {...register('_type.customerInfo.firstName')}>  
                </TextField.Root>
           </Box>
           <Box width='auto'>
                <Text as='label'>Last Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root  size="1" placeholder="Last Name" {...register('_type.customerInfo.lastName')}>
                   
                </TextField.Root>
           </Box>
           </Flex>
           <Box className='w-[60%]'>
           <Text as='label'>Email<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Email" {...register('_type.customerInfo.email')}>
            </TextField.Root>
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Phone number<Text as='span' color='red'>*</Text></Text>
           <TextField.Root  size="3" placeholder="Phone number" {...register('_type.customerInfo.phone')}>
           
            </TextField.Root>
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Address<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Street name, House number" {...register('_type.customerInfo.address')}>
         
            </TextField.Root>
          </Box>
          <Box className='w-auto'>
            <Text as='label'>Note(optional) </Text>
            <Controller
            name='_type.note'
            control={control}
            render={({field: {value, onChange}}) => (
              <SimpleMDE value={value}
              onChange={onChange} placeholder='Add a note here to add restrictions/preferences to your order.
              Or to give us more details about the delivery location '/>
            )}
            />
         
         
   
          </Box>

</Flex>
    </Box>
    <Box>
    <Heading size='4' mb='4'>Your Order</Heading>
        <Flex gap='4'>
        <Text as='div'>Item</Text>
        <Text as='div'>unit price</Text>
        </Flex>
        {cart.map(item => {
            return <Flex gap='6'><Text as='div'>{item.menuItem.name}</Text><Text as='span'> x {item.quantity}</Text><Text>{item.menuItem.price}</Text></Flex>
        })}
        <Text as='div'>Total:{total}</Text>
        <Heading size='1' mb='4'>Choose delivery time?</Heading>
        <Flex direction="column"gap="5" >
         <Box>
        <Text as='span' className='mr-5' >Delivery Date</Text> 
      
        <Controller 
        name='_type.deliveryTimeSlot'
        control={control} 
        defaultValue={deliveryDates.today} 
        render={({ field: { onChange, value } }) => (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger variant='soft' />
      <Select.Content>
        <Select.Item value={deliveryDates.today}>today</Select.Item>
        <Select.Item value={deliveryDates.tomorrow}>tomorrow</Select.Item>
      </Select.Content>
    </Select.Root>
  )}
/>
        </Box>
        <Box>
        <Text as='span' className='mr-5' >Delivery Time</Text> 
        <Select.Root>
            <Select.Trigger variant='soft'/>
            <Select.Content>
              <Select.Item value='10:00-11:00'>10:00-11:00</Select.Item>
              <Select.Item value='11:00-12:00'>11:00-12:00</Select.Item>
              <Select.Item value='13:00-14:00'>13:00-14:00</Select.Item>
              <Select.Item value='14:00-15:30'>14:00-15:30</Select.Item>
              <Select.Item value='18:00-19:00'>18:00-19:00</Select.Item>
              <Select.Item value='19:00-20:00'>19:00-20:00</Select.Item>
              <Select.Item value='20:00-21:30'>20:00-21:30</Select.Item>
            </Select.Content>
        </Select.Root>
        </Box ></Flex>
        <Box>
        <Heading>Payment Method</Heading>
        <Controller
        name="_type.paymentMode"
        defaultValue="MOBILEMONEY"
        control={control}
        render={({ field: {value, onChange} }) => (
          <RadioGroup.Root value={value} onValueChange={onChange}>
          <RadioGroup.Item value="CASH" >cash</RadioGroup.Item>
          <RadioGroup.Item value="MOBILEMONEY">Mobile Money</RadioGroup.Item>
          </RadioGroup.Root>
        )}
        />
    
        <Text as='label' className='py-5 text-xl'>Total: {total}</Text>
        </Box> 
        <Button type='submit'>Place Order</Button>
    </Box>
    </Grid>
    </form>
  )
}

export default OrderForm;





