'use client'
import React from 'react';
import { Input } from "@/components/ui/input";  
import { Button } from "@/components/ui/button"; 
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"; 
// import Image from 'next/image';

const ProfilePage = () => {
  return (
    <div className='min-h-screen w-full flex items-start justify-center px-3'>
      <div className="rounded-xl border border-neutral-200 lg:w-1/2 mt-4 w-full">
        {/* Profile Details */}
        <div className="p-6">
          <h1 className="text-4xl font-bold">Your Profile</h1>

          {/* Profile content */}
          <div className="w-full items-center flex flex-col justify-center mt-8">
            <p className="text-md font-bold mb-3">@Doctorbee</p>

            <div className="flex items-center justify-center gap-6">
              <span className="text-md flex gap-1">
                <span className="font-bold">136</span>
                <span className="font-thin">followers</span>
              </span>
              <span className="text-md flex gap-1">
                <span className="font-bold">21</span>
                <span className="font-thin">following</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <div className="w-24 h-24 bg-green-300 rounded-full">
                {/* <Image
                  src="https://via.placeholder.com/150"
                  alt="Profile Pic"
                  className="w-full h-full object-cover rounded-full"
                /> */}
              </div>
              <button className="bg-neutral-200 rounded-md px-3 py-1 mt-4">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-bold">Name</label>
                <Input type="text" id="name" placeholder="Enter your name" />
              </div>

              {/* Handle Field */}
              <div className="flex flex-col">
                <label htmlFor="handle" className="mb-1 font-bold">Handle</label>
                <Input type="text" id="handle" placeholder="@handle" />
              </div>

              {/* Bio Field */}
              <div className="flex flex-col">
                <label htmlFor="bio" className="mb-1 font-bold">Bio</label>
                <Input type="text" id="bio" placeholder="A short bio about yourself" />
              </div>

              {/* Skills Field */}
              <div className="flex flex-col">
                <label htmlFor="skills" className="mb-1 font-bold">Skills</label>
                <Input type="text" id="skills" placeholder="Your skills" />
              </div>

              {/* Portfolio Field (Optional) */}
              <div className="flex flex-col">
                <label htmlFor="portfolio" className="mb-1 font-bold">Portfolio (optional)</label>
                <Input type="text" id="portfolio" placeholder="Link to portfolio" />
              </div>

              {/* Country Dropdown (Optional) */}
              <div className="flex flex-col">
                <label htmlFor="country" className="mb-1 font-bold">Country (optional)</label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button className=" bg-primaryColor text-white px-4 py-1">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
