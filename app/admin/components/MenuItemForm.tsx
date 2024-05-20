'use client';

import { Box, Button, Dialog, Flex, Text, TextField, TextArea, Callout, Spinner } from '@radix-ui/themes'
import { CreateMenuItemFormSchema, createMenuItemSchema } from '../../validationSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import { useState } from 'react';


type menuItemFormData = z.infer<typeof CreateMenuItemFormSchema>
type menuItemData = z.infer<typeof createMenuItemSchema>

const MenuItemForm = () => {
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<menuItemFormData>({resolver: zodResolver(CreateMenuItemFormSchema)});

    const onSubmit: SubmitHandler<menuItemFormData> = async (formData) => {
        try {
            setSubmitting(true);
            console.log(formData);
            const parsedPrice = Number(formData.price);
            const data: menuItemData = {
                ...formData,
                price : parsedPrice
            };

            console.log(data);
            await axios.post('/api/menuitem', data);
            setFormSubmitted(true);
            setSubmitting(false);
        } catch (error) {
            console.error('Error submitting menuItem:', error);
        }
      
    }
  return (
    <Box>
    <Dialog.Root>
            <Dialog.Trigger>
                <Button variant='soft' size="4">Create Menu Item</Button>
           </Dialog.Trigger>
           <Dialog.Content maxWidth="450px">
           <Dialog.Title>Create MenueItem</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            Create a new menu item.
           </Dialog.Description>
           {error && (<Callout.Root color='red' className='mb-5'>
    <Callout.Text>{error}</Callout.Text></Callout.Root>)}
           <form onSubmit={handleSubmit(onSubmit)}>
           <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Name
        </Text>
        <TextField.Root
          placeholder="Enter the name of MenuItem"
          {...register('name')}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage> 
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Amharic name
        </Text>
        <TextField.Root
          placeholder="ሽሮ"
          {...register('amharicname')}
        />
        <ErrorMessage>{errors.amharicname?.message}</ErrorMessage> 
      </label>
      <label>
      <Text as="div" size="2" mb="1" weight="bold">
        Discription
      </Text>
        <TextField.Root
         placeholder="Chickpea stew."
         {...register('description')}

        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage> 
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Price
        </Text>
        <TextField.Root
          placeholder="12000"
          {...register('price')}
        />
        <ErrorMessage>{errors.price?.message}</ErrorMessage> 
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Image_url
        </Text>
        <TextField.Root
          placeholder="/Shiro.jpeg"
          {...register('image_url')}
        />
        
      </label>
      <ErrorMessage>{errors.image_url?.message}</ErrorMessage> 
      <Button type='submit' variant='soft' size='2' disabled={submitting}>Create
         {submitting && <Spinner />}
      </Button>
    </Flex>
    {formSubmitted && <Text>Item created!</Text>}
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button>Done</Button>
      </Dialog.Close>
    </Flex>
    </form>
           </Dialog.Content>
        </Dialog.Root>
    </Box>
  )
}

export default MenuItemForm