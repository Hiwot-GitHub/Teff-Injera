'use client'
import { Box, Flex, TextField, Text, Grid, Heading, Button, Callout, Select, RadioGroup } from '@radix-ui/themes'
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
import { CartItem } from '@/app/CartContext';
import   ErrorMessage  from './ErrorMessage';
import Spinner from './Spinner';

type orderFormData = z.infer<typeof CreateOrderFormSchema>
type orderData = z.infer<typeof CreateOrderSchema>

const OrderForm = () => {
    const {cart, total, clearCart} = useContext(CartContext);
    const [error, setError] = useState('');
    const [selectedTimeslot, setSelectedTimeSlot] = useState('');
    const { register, handleSubmit, control,  formState: { errors } } = useForm<orderFormData>({resolver: zodResolver(CreateOrderFormSchema)});
    const router = useRouter();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);



    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);


const deliveryDates = {
  today: currentDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
  tomorrow: tomorrowDate.toISOString().split('T')[0], // Format: "YYYY-MM-DD"
};
const [selectedDate, setSelectedDate] = useState(deliveryDates.today);

const timeSlots = [
  {id: '10', 'interval': '10:00-11:00','disable': false },
  {id: '11', 'interval': '11:00-12:00','disable':false },
  {id: '12', 'interval': '12:00-13:00','disable':false} ,
  {id: '13', 'interval': '13:00-14:00','disable':false },
  {id: '14' , 'interval': '14:00-15:30','disable':false} ,
  {id: '18','interval': '18:00-19:00','disable':false} ,
  {id: '19', 'interval': '19:00-20:00','disable':false },
  {id: '20','interval': '20:00-21:30','disable':false} 

];

const [updatedTimeSlot, setUpdatedTimeSlot] = useState(timeSlots);

//a useEffect to  disable past delivery time interval if order is for today
useEffect(() => {
  const newTimeSlots = timeSlots.map((timeSlot) => {
    const isPast = selectedDate === deliveryDates.today && currentHour.toString() >=  timeSlot.id;
    return {
     ...timeSlot,
     disable: isPast
    }
  });
  setUpdatedTimeSlot(newTimeSlots);
},[selectedDate, currentHour]);

const onSubmit: SubmitHandler<orderFormData> = async (formData) => {
  try{
    setSubmitting(true);
    const parsedCart: CartItem[] = JSON.parse(formData.cart);
    const parsedTotal: number = Number(formData.total);
    const deliveryDate = formData.deliveryDate;
    const deliveryTime = formData.deliveryTime;
    const deliveryTimeSlot = `${deliveryDate} ${deliveryTime}`;
    const data: orderData = {
      ...formData,
      cart: parsedCart,
      total: parsedTotal,
      deliveryTimeSlot:deliveryTimeSlot

    };
    console.log(data);
    await axios.post('/api/order', data);
    clearCart();
    setFormSubmitted(true);
  }catch(error){
    console.error('Error submitting order:', error);
  }
 
}


  
  return (
    <>
    {formSubmitted?(<Text>We have received your order!Thank you.</Text>): (
    <>
    {error && (<Callout.Root color='red' className='mb-5'>
    <Callout.Text>{error}</Callout.Text></Callout.Root>)}
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid columns={{initial: '1' , md: '2'}} gap='5' width='auto' className='sm: px-10'>
    <Box>
        <Heading as="h1" size="4">Billing and Shipping</Heading>
        <Flex direction="column" gap="4">
            <Flex gapX="4px">
             <Box width='auto'>
                <Text as='label'>First Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root size="1" placeholder="First Name" {...register('firstName')}></TextField.Root>
                <ErrorMessage>{errors.firstName?.message}</ErrorMessage> 
           </Box>
           <Box width='auto'>
                <Text as='label'>Last Name<Text as='span' color='red'>*</Text></Text>
                <TextField.Root  size="1" placeholder="Last Name" {...register('lastName')}> </TextField.Root>
                <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
           </Box>
           </Flex>
           <Box className='w-[60%]'>
           <Text as='label'>Email<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Email" {...register('email')}></TextField.Root>
           <ErrorMessage>{errors.email?.message}</ErrorMessage> 
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Phone number<Text as='span' color='red'>*</Text></Text>
           <TextField.Root  size="3" placeholder="Phone number" {...register('phone')}></TextField.Root>
           <ErrorMessage>{errors.phone?.message}</ErrorMessage> 
          </Box>
          <Box className='w-[60%]'>
          <Text as='label'>Address<Text as='span' color='red'>*</Text></Text>
           <TextField.Root size="3" placeholder="Street name, House number" {...register('address')}></TextField.Root>
           <ErrorMessage>{errors.address?.message}</ErrorMessage> 
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
        <Flex direction="column" gap="5">
         <Box>
        <Text as='span' className='mr-5'>Delivery Date</Text> 
      
        <Controller 
        name='deliveryDate'
        control={control} 
       
        render={({ field: { onChange, value } }) => ( 
            <Select.Root value={value} onValueChange={(date) => {onChange(date);
              setSelectedDate(date);
            }} defaultValue={selectedDate}>
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
        <Controller 
        name='deliveryTime'
        control={control}

        render={({field: {onChange, value}}) => (

          <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger variant='soft'/>
            <Select.Content>
            {updatedTimeSlot.map((timeSlot) => {
              return <Select.Item key={timeSlot.id} value={timeSlot.interval} disabled={timeSlot.disable}>{timeSlot.interval}</Select.Item>
    })}
             
            </Select.Content>
        </Select.Root>
        )}
        />
        </Box ></Flex>
        <Box mb="8">
        <Heading my="2">Payment Method</Heading>
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
          <ErrorMessage>{errors.paymentMode?.message}</ErrorMessage> 
    
        <Text as='label' className='py-5 text-xl'>Total: {total}</Text>
        </Box> 
        <Button type="submit" disabled={submitting} variant='solid' size='4' className='m-8'>Place Order
        {submitting && <Spinner />}</Button>
    </Box>
    </Grid>
    </form>
    </>
   )}
  
  </>
  )
}

export default OrderForm;





