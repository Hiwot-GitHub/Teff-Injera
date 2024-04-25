import { Box } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('@/app/components/OrderForm'),{ssr: false});

const CheckoutPage = () => {
  return (
    
      <Box>
        <OrderForm/>
      </Box>
    
  )
}

export default CheckoutPage