import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";
import  { createMenuItemSchema} from '@/app/validationSchema'


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createMenuItemSchema.safeParse(body);

    if(!validation.success)
      return NextResponse.json({error: validation.error.errors}, {status: 400});
  
    const menuItem = await prisma.menuItem.create({
        data: {name:body.name, amharicname: body?.amharicname, description: body.description, price: body.price, image_url: body.image_url}
    });

    return NextResponse.json(menuItem,{status: 201});
      
}