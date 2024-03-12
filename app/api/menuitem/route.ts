import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createMenuItemSchema = z.object({
    name : z.string().min(1).max(255),
    description : z.string().min(1), 
    price : z.number().min(1),
    image_url : z.string().min(1).max(255), 
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createMenuItemSchema.safeParse(body);

    if(!validation.success)
      return NextResponse.json({error: validation.error.errors}, {status: 400});
    const menuItem = await prisma.menuItem.create({
        data: {name:body.name, description: body.description, price: body.price, image_url: body.image_url}
    });

    return NextResponse.json(menuItem,{status: 201});
      
}