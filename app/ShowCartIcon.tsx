'use client';

import CartIcon from './components/CartIcon'
import { usePathname } from 'next/navigation'

const ShowCartIcon = () => {
    const currentPath = usePathname();
  return (
    <>
        { currentPath !== '/checkout' && <CartIcon />}
    </>
  )
}

export default ShowCartIcon