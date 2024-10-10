'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'

const NavbarWrapper = () => {
    const pathname = usePathname()

  return pathname !== '/' && <Navbar />
}

export default NavbarWrapper