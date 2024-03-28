import prisma from "@/prisma/client";
import { Customer } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

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

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = CreateOrderSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const { customerInfo, ...orderDetails } = validation.data

    const { email, phone, ...restCustomerInfo } =  customerInfo 

    if (!email && !phone) {
        return NextResponse.json('Email or phone number is required', { status: 400 });
    }
    
    const customerByEmail = await prisma.customer.findUnique({
        where: {
                email: email,    
        } ,      
    
    });

        
    const customerByPhone = await prisma.customer.findUnique({
        where: {
                phone: phone,    
        } ,   
    
    });

    let customer = customerByEmail || customerByPhone;
    
    if (!customer) {
        // Customer doesn't exist, create new customer
        customer = await prisma.customer.create({
            data: customerInfo,
        });
    }

    const { cart, total, note, deliveryTimeSlot, paymentMode } = orderDetails;
    
    const newOrder = await prisma.order.create({
        data: {
            customer: {
                connect: {id: customer.id},
            },
            cart: cart,
            total: total,
            note: note,
            deliveryTimeSlot: deliveryTimeSlot,
            status: 'PENDING',
            paymentMode: paymentMode,
        }
    });

    return NextResponse.json(newOrder, {status: 201});


}