import { Input } from '@/components/ui/input'
import { projects } from '@/data'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { TbFilterSearch } from 'react-icons/tb'
import Image from 'next/image'

const ProjectPage = () => {
  return (
    <div className='container mx-auto min-h-screen flex items-center justify-start flex-col px-4 sm:px-8'>

        <div className="bg-secondaryColor rounded-lg flex gap-2 items-center justify-center py-1 px-2 mt-20 sm:mt-32 ">
            <div className="h-3 w-3 bg-green-400 rounded-full"></div>
            <p className="text-md">Over 100 projects uploaded on Based</p>
        </div>

        <h1 className='font-bold text-4xl sm:text-6xl lg:text-9xl mt-6 text-center'>
          The best destination for top projects
        </h1>

        <p className='text-center text-lg sm:text-xl mt-4 sm:mt-8'>
          Get inspired by the work of top-rated builders around the world
        </p>

        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 w-full">
            <Input type='text' placeholder='Search' className='w-full  sm:w-[360px] lg:w-[450px]' />
            <div className="h-full rounded-md border border-neutral-500 p-3">
                <TbFilterSearch />
            </div>
        </div>

        {/* Filter buttons  */}
        <div className="flex flex-wrap w-full items-center justify-center mt-4 sm:mt-6 gap-2">
            <button className="px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md bg-primaryColor/10 text-foreground">
              Idea <IoClose />
            </button>
            <button className="px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md bg-primaryColor/10 text-foreground">
              Prototype <IoClose />
            </button>
            <button className="px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md bg-primaryColor/10 text-foreground">
              Smart contract <IoClose />
            </button>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project, idx) => {
                return (
                    <div key={idx} className="max-w-full sm:max-w-[300px] rounded-lg overflow-hidden ">
                        <Image src={project.image} alt={'project image'} width={300} height={200} className='object-cover' />
                        <div className="py-2 text-primaryColor flex items-center justify-between">
                          <div className="flex items-center justify-center gap-1">
                            <span className="w-8 h-8 rounded-full bg-green-300"></span>
                            <p className="text-sm">{project.description}</p>
                          </div>
                          <button className="text-blue-500 hover:text-blue-700">
                            Collaborate
                          </button>
                        </div>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default ProjectPage
