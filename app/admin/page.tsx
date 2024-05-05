import prisma from '@/prisma/client';
import { Box, Heading, Table } from '@radix-ui/themes';
import React from 'react'
import { CartItem } from '../CartContext';

const Adminpage = async () => {
    const orders = await prisma.order.findMany();
  return (
    <Box>
        <Heading>Orders</Heading>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>OrderId</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>CreatedAt</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>UpdatedAt</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>CustomerId</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Cart</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>DeliveryTimeSlot</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>PaymentMode</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {orders.map((order) => {
                    return (
                      <Table.Row key={order.id}>
                        <Table.RowHeaderCell>{order.id}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.createdAt.toDateString()}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.updatedAt.toDateString()}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.customerId}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>
                            <ul>
                            {(order.cart as unknown as CartItem[]).map((cartItem, index) => (
                            <li key={index}>
                                {cartItem.menuItem.name} - {cartItem.quantity}
                            </li>
                        ))}
                        </ul>
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.total}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.note}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.deliveryTimeSlot}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.status}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{order.paymentMode}</Table.RowHeaderCell>
                    </Table.Row>
                    )
                })}
                
            </Table.Body>
        </Table.Root>
    </Box>
  )
}

export default Adminpage;