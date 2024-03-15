'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        {label:'Home',href: "/"},
        {label: "Menu",href: "/menu"},
        {label: "review", href: "/review"} ,
        {label:"contact us", href: "/contact"}
    ];
  return (
    <nav className='flex flex-col md:flex-row space-x-6 border-b mb-5 px-5 py-3 sm:h-24 items-center justify-between'>
        <h1 className='font-serif text-6xl md:text-8xl text-ShuterGrey p-4'>Teff Injera</h1>
        <ul className='flex space-x-8'>
          
            {links.map(link  =>
                <li key={link.href}>
                    <Link href={link.href} 
                          className={classnames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500' : link.href !== currentPath,
                            'hover:text-zinc-800' : true
                          })}>
                          {link.label}
                    </Link>
                </li>
             )}
        
           </ul>
           
        
        </nav>
       
        
  )
}

export default NavBar