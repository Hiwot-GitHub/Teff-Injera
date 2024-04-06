import { z } from 'zod';

export const CustomerInfoSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/), // Example regex for a 10-digit phone number
    address: z.string(),
  });


export const CreateOrderSchema = z.object({
    customerInfo : CustomerInfoSchema,
    cart: z.array(
      z.object({
        menuItemId: z.number(), 
        quantity: z.number().min(1), 
      })
    ),
    total: z.number().min(0), 
    note: z.string().optional(), 
    deliveryTimeSlot: z.string().optional(), 
    paymentMode: z.enum(['CASH', 'MOBILEMONEY']),
  });