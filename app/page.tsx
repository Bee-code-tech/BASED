"use client";
import Image from "next/image";
import hero from "../assets/hero.png";
import logo from "../assets/light.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { BlackCreateWalletButton } from "@/components/BlackCreateButton";
import {useAccount} from "wagmi"
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const {address} = useAccount()
  if (address){
    router.push("/projects", {scroll:false})
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-hero py-10 px-3">
      {/* Navbar */}
      <div className="lg:w-[75%] md:w-[90%]  rounded-lg border border-white py-4 px-4 mx-auto mb-12 bg-black/10 backdrop-blur-md text-white flex items-center justify-between ">
        <div className="ml-4">
          <Image src={logo} alt="Logo" className="lg:w-36 w-24 " />
        </div>
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-6">
          <span>Home</span>
          <span>About Us</span>
          <span>Contact</span>

          <BlackCreateWalletButton
            height={50}
            width={100}
            name={"Join a Community"}
          />

          <Link href={"/projects"}>
            <button className="border bg-white text-primaryColor rounded-lg px-3 py-2 mr-4">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu - Shown only on smaller screens */}
        <div className="lg:hidden">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="link" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="p-4 bg-white text-primaryColor rounded-lg"
            >
              <div className="flex flex-col items-start gap-4 mt-4">
                <span>Home</span>
                <span>About Us</span>
                <span>Contact</span>
                <button className="border border-primaryColor rounded-lg px-4 py-2">
                  Join a Community
                </button>
                <Link href={"/projects"}>
                  <button className="border bg-primaryColor text-white rounded-lg px-3 py-2 mr-4">
                    Sign Up
                  </button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile card  */}
      <div className="flex lg:hidden mx-auto w-full  items-center justify-center -mt-4 mb-3">
        <Image
          src={hero}
          alt="First Image"
          className="w-[120px] object-cover rounded-lg"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center text-white">
        {/* Heading */}
        <div className="lg:w-[60%] mx-auto ">
          <h1 className="text-5xl lg:text-7xl font-bold ">
            Connect & Collaborate with Base Builders
          </h1>
        </div>
        {/* Subheading */}
        <p className="text-xl font-light ">
          A decentralized social platform on Base Network where you own your
          content, connect freely, and build communities without limits.
        </p>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 w-[75%]">
          {/* First Image - Hidden on mobile and medium screens */}
          <div className="hidden lg:block col-span-1">
            <Image
              src={hero}
              alt="First Image"
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Text Button - Visible on all screen sizes */}
          <div className="col-span-1 flex items-center lg:justify-center lg:flex-row flex-col  ">
            <div className="grid grid-cols-3 align-center justify-evenly lg:hidden mb-8 w-full gap-6">
              <div className="-rotate-12">
                <Image
                  src={hero}
                  alt="Third Image - Row 1"
                  className="w-full object-cover rounded-lg"
                />
              </div>
              <div>
                <Image
                  src={hero}
                  alt="Third Image - Row 1"
                  className="w-full object-cover rounded-lg"
                />
              </div>
              <div className="rotate-12">
                <Image
                  src={hero}
                  alt="Third Image - Row 1"
                  className="w-full object-cover rounded-lg"
                />
              </div>
            </div>
            <BlackCreateWalletButton
              height={50}
              width={100}
              name={"Get Started"}
            />
          </div>

          {/* Second Image - Hidden on mobile, visible from medium screens onwards */}
          <div className="hidden md:block col-span-1">
            <div className="grid grid-cols-2 gap-4 w-full mx-auto rotate-12">
              {/* First Column - Single Image */}
              <div className="flex items-center justify-center">
                <Image
                  src={hero}
                  alt="Second Image"
                  className="w-full object-cover rounded-lg"
                />
              </div>

              {/* Second Column - Two Images */}
              <div className="grid grid-rows-2 gap-4">
                <div>
                  <Image
                    src={hero}
                    alt="Third Image - Row 1"
                    className="w-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <Image
                    src={hero}
                    alt="Fourth Image - Row 2"
                    className="w-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
