'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation'; 
import logo from '../assets/Based.png';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react'; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 

  const links = [
    { name: 'Highlight', path: '/highlights' },
    { name: 'Following', path: '/following' },
    { name: 'Communities', path: '/communities' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <div className='border-b px-6 lg:px-16 flex items-center justify-between'>
      <Image src={logo} alt={'based'} className='w-28 lg:w-36 py-6' />
      
      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-center gap-8 text-primaryColor">
        {links.map((link) => (
          <Link key={link.path} href={link.path} className={`${pathname === link.path ? 'text-red-500' : ''} cursor-pointer`}>
            {link.name}
          </Link>
        ))}
        <Button className='bg-primaryColor rounded-lg px-4 py-2 text-white'>
          Create project
        </Button>
       <Link href={'/profile'} > <div className="h-12 w-12 bg-green-400 rounded-full mr-12"></div></Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" >
            <div className="flex flex-col items-start gap-4 mt-8 w-full">
              {links.map((link) => (
                <Link key={link.path} href={link.path} className={`${pathname === link.path ? 'text-red-500' : ''} cursor-pointer`}>
                  {link.name}
                </Link>
              ))}
              <Button className='bg-primaryColor rounded-lg px-4 py-2 text-white'>
                Create project
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
