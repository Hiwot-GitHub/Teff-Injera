import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CreateOrderSchema } from "@/app/validationSchema";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = CreateOrderSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const {  cart, total, note, deliveryTimeSlot, paymentMode, ...customerInfo  } = validation.data

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
        try {
            customer = await prisma.customer.create({
                data: customerInfo,
            });
            
        } catch (error) {
            return NextResponse.json('Error creating customer', { status: 500 });
        }
       
    }
    
    //const { cart, total, note, deliveryTimeSlot, paymentMode } = orderDetails;
    
    try {
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
} catch(error){
    console.error('Error creating order:', error);
    return NextResponse.json('Error creating order', { status: 500 });
}

}
