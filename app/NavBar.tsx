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
    <nav className='flex flex-col lg:flex-row space-x-6 border-b lg:h-24 mb-5 px-5 py-3  items-center justify-between'>
        <div className='flex'><h1 className='font-serif text-6xl md:text-7xl lg:text-8xl text-ShuterGrey p-4'>Teff Injera</h1> 
        <h2 className='ml-0 mt-16 text-2xl'>የጤፍ እንጀራ</h2></div>
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