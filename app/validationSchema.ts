import { z } from 'zod';

export const createMenuItemSchema = z.object({
  name : z.string().min(1).max(255),
  amharicname : z.string().min(1),
  description : z.string().min(1), 
  price : z.number().min(1),
  image_url : z.string().min(1).max(255), 
})

const MenuItemSchema = z.object({
  id : z.number(),
  name : z.string().min(1).max(255),
  amharicname : z.string().min(1),
  description : z.string().min(1), 
  price : z.number().min(1),
  image_url : z.string().min(1).max(255), 
})

export const CustomerInfoSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/), // Example regex for a 10-digit phone number
    address: z.string(),
  });

  export const CreateOrderSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/), // Example regex for a 10-digit phone number
    address: z.string(),
    cart: z.array(
      z.object({
        menuItem: MenuItemSchema,
        quantity: z.number().min(1)
      })
    ),
    total: z.number().min(0), 
    note: z.string().optional(), 
    deliveryTimeSlot: z.string().optional(), 
    paymentMode: z.enum(['CASH', 'MOBILEMONEY']),
  });

// client side validation for the form
export const CreateOrderFormSchema = z.object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().min(1,"last name is required"),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/), // Example regex for a 10-digit phone number
    address: z.string().min(1, "Address is required"),
    cart: z.string(),
    total: z.string(),
    note: z.string().optional(), 
    deliveryDate: z.string().optional(), 
    deliveryTime:z.string().optional(),
    paymentMode: z.enum(['CASH', 'MOBILEMONEY']),
  });