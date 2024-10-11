'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'; 
import logo from '../assets/Based.png';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react'; 
import avatar from '../assets/avatar.png';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Profile and Logout Icons

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // For detecting outside clicks

  const links = [
    { name: 'Highlight', path: '/highlights' },
    { name: 'Following', path: '/following' },
    { name: 'Communities', path: '/communities' },
    { name: 'Channels', path: '/channels' },
    { name: 'Projects', path: '/projects' },
  ];

  const walletAddress = '0x1234...abcd'; // Example wallet address

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        {/* Profile Custom Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="cursor-pointer h-12 w-12  rounded-full flex items-center"
          >
            <Image src={avatar} alt='profile picture' width={12} height={12} className='w-full object-cover cursor-pointer' />
          </div>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Attach ref to dropdown
              className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
            >
              {/* Profile picture and wallet address */}
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full h-12 w-12">
                  <Image src={avatar} alt='profile' width={12} height={12} className='w-full object-cover cursor-pointer' />
                </div> 
                <div>
                  <h4 className="font-bold">doctorbee.base.eth</h4> 
                  <span className="text-gray-500">{walletAddress}</span> {/* Wallet Address */}
                </div>
              </div>

              {/* Profile Link */}
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <FaUser className="text-gray-600" /> 
                <span>Profile</span>
              </Link>

              {/* Disconnect Button */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md mt-2" onClick={() => console.log('User disconnected')}>
                <FaSignOutAlt className="text-gray-600" />
                <span>Disconnect</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex gap-2 items-center lg:hidden">
        <div className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Profile Custom Dropdown for Mobile */}
        <div className="relative lg:hidden">
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="cursor-pointer h-12 w-12 rounded-full"
          >
            <Image src={avatar} alt='profile picture' width={12} height={12} className='w-full object-cover cursor-pointer' />
          </div>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
            >
              {/* Profile picture and wallet address */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full">
                  <Image src={avatar} alt='profile picture' width={12} height={12} className='w-full object-cover cursor-pointer' />
                </div> 
                <div>
                  <h4 className="font-bold">doctorbee.base.eth</h4> 
                  <span className="text-gray-500">{walletAddress}</span> {/* Wallet Address */}
                </div>
              </div>

              {/* Profile Link */}
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <FaUser className="text-gray-600" /> 
                <span>Profile</span>
              </Link>

              {/* Disconnect Button */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md mt-2" onClick={() => console.log('User disconnected')}>
                <FaSignOutAlt className="text-gray-600" />
                <span>Disconnect</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
