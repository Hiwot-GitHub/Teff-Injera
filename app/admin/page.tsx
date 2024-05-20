import prisma from '@/prisma/client';
import MenuItemForm from './components/MenuItemForm';
import ViewOrder from './components/View-orders';


const Adminpage = async () => {
    const orders = await prisma.order.findMany();

   
  return (
    <>
    <ViewOrder orders={orders} />
    <MenuItemForm />
    </>
  )
}
export default Adminpage;