'use client'
import { Box, Flex, TextField, Text, Grid, Heading, Button, DropdownMenu, Select, RadioGroup } from '@radix-ui/themes'
import React, { useContext, useState, useEffect } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import CartContext from '../CartContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useController, SubmitHandler } from "react-hook-form";
import { CreateOrderFormSchema, CreateOrderSchema } from '../validationSchema';
import axios from'axios';
import { useRouter } from 'next/navigation'; 
import { z } from 'zod'
import { CartItem } from '../CartContex';

type orderFormData = z.infer<typeof CreateOrderFormSchema>
type orderData = z.infer<typeof CreateOrderSchema>

const OrderForm = () => {
    const {cart, total} = useContext(CartContext);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { register, handleSubmit, control } = useForm<orderFormData>({resolver: zodResolver(CreateOrderFormSchema)});
    const router = useRouter();

    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

const deliveryDates = {
  today: currentDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
  tomorrow: tomorrowDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
};

const onSubmit: SubmitHandler<orderFormData> = async (formData) => {
  try{
    console.log(formData);
    const parsedCart: CartItem[] = JSON.parse(formData.cart);
    const parsedTotal: number = Number(formData.total);
    const data: orderData = {
      ...formData,
      cart: parsedCart,
      total: parsedTotal

    };
    console.log(data);
    await axios.post('/api/order', data);
  }catch(error){
    console.error('Error submitting order:', error);
  }
 
}


  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid columns={{initial: '1' , md: '2'}} gap='5' width='auto' className='sm: px-10'>
    <Box>
        <Heading as="h1" size="4">Billing and Shipping</Heading>
        <Flex direction="column" gap="4">
            <Flex gapX="4px">
             <Box width='auto'>
                <Text as='label'>First Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root size="1" placeholder="First Name" {...register('firstName')}>  
                </TextField.Root>
           </Box>
           <Box width='auto'>
                <Text as='label'>Last Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root  size="1" placeholder="Last Name" {...register('lastName')}>
                   
                </TextField.Root>
           </Box>
           </Flex>
           <Box className='w-[60%]'>
           <Text as='label'>Email<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Email" {...register('email')}>
            </TextField.Root>
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Phone number<Text as='span' color='red'>*</Text></Text>
           <TextField.Root  size="3" placeholder="Phone number" {...register('phone')}>
           
            </TextField.Root>
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Address<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Street name, House number" {...register('address')}>
            </TextField.Root>
            <input type="hidden" {...register('cart')} value={JSON.stringify(cart)} />
            <input type="hidden" {...register('total')} value={total} />
          </Box>
          <Box className='w-auto'>
            <Text as='label'>Note(optional) </Text>
            <Controller
            name='note'
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
            return <Flex key={item.menuItem.id} gap='6'><Text as='div'>{item.menuItem.name}</Text><Text as='span'> x {item.quantity}</Text><Text>{item.menuItem.price}</Text></Flex>
        })}
        <Text as='div'>Total:{total}</Text>
        <Heading size='1' mb='4'>Choose delivery time?</Heading>
        <Flex direction="column"gap="5" >
         <Box>
        <Text as='span' className='mr-5'>Delivery Date</Text> 
      
        <Controller 
        name='deliveryTimeSlot'
        control={control} 
       
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
        name="paymentMode"
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
        <Button type="submit">Place Order</Button>
    </Box>
    </Grid>
    </form>
  )
}

export default OrderForm;





