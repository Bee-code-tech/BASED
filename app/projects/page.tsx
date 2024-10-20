'use client'
import { Input } from '@/components/ui/input'
import { IoClose } from 'react-icons/io5'
import { TbFilterSearch } from 'react-icons/tb'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react';
import { useReadContracts, useAccount } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "@/constants";

interface ProjectData {
  category: string;
  creator: string;
  description: string;
  members: bigint;
  projectGoals: string;
  projectId: string;
  projectImage: string;
  projectLinks: string[];
  projectName: string;
  projectStage: string;
  techUsed: string[];
}

interface ReadContractResult {
  result: {
    projectId: string;
    creator: string;
    projectName: string;
    projectImage: string;
    description: string;
    category: string;
    members: bigint;
    projectGoals: string;
    projectLinks: string[];
    projectStage: string;
    techUsed: string[];
  }[];
  status: "success" | "failure";
}

const ProjectPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const { address } = useAccount()

  const { data: projectsData, isError } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'getAllProjects',
      }
    ]
  })

  
  useEffect(() => {
    const initializeProjects = () => {
      if (projectsData && Array.isArray(projectsData)) {
        try {
          const result = projectsData[0]?.result; 
          const status = projectsData[0]?.status; 
      
          if (status === "success" && Array.isArray(result)) {
            setProjects(result);
            setFilteredProjects(result);
          } else {
            setError('Failed to format project data');
          }
        } catch (err) {
          console.trace( err);
          setError("error");
        } finally {
          setIsLoading(false);
        }
      }
      
    };
  
    if (isError) {
      setError('Failed to fetch projects');
      setIsLoading(false);
    } else {
      initializeProjects();
    }
  }, [projectsData, isError]);

  // Memoized search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    setFilteredProjects(projects.filter(project => 
      project.projectName.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    ))
  }, [projects])

  // Memoized filter handler
  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter)
    
    if (filter === 'all') {
      setFilteredProjects(projects)
      return
    }
    
    setFilteredProjects(projects.filter(project => 
      project.projectStage.toLowerCase().includes(filter.toLowerCase())
    ))
  }, [projects])

  // Memoized clear filter handler
  const clearFilter = useCallback((filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter('all')
      setFilteredProjects(projects)
    }
  }, [activeFilter, projects])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading projects...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto min-h-screen flex items-center justify-start flex-col px-4 sm:px-8'>
        <div className="bg-secondaryColor rounded-lg flex gap-2 items-center justify-center py-1 px-2 mt-20 sm:mt-32 ">
            <div className="h-3 w-3 bg-green-400 rounded-full"></div>
            <p className="text-md">Over {projects.length} projects uploaded on Based</p>
        </div>

        <h1 className='font-bold text-4xl sm:text-6xl lg:text-9xl mt-6 text-center'>
          The best destination for top projects
        </h1>

        <p className='text-center text-lg sm:text-xl mt-4 sm:mt-8'>
          Get inspired by the work of top-rated builders around the world
        </p>

        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 w-full">
            <Input 
              type='text' 
              placeholder='Search' 
              className='w-full sm:w-[360px] lg:w-[450px]'
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="h-full rounded-md border border-neutral-500 p-3">
                <TbFilterSearch />
            </div>
        </div>

        {/* Filter buttons  */}
        <div className="flex flex-wrap w-full items-center justify-center mt-4 sm:mt-6 gap-2">
            <button 
              onClick={() => handleFilterChange('ideation')}
              className={`px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md ${
                activeFilter === 'ideation' ? 'bg-primaryColor text-white' : 'bg-primaryColor/10 text-foreground'
              }`}
            >
              Idea {activeFilter === 'ideation' && <IoClose onClick={(e) => { e.stopPropagation(); clearFilter('ideation'); }} />}
            </button>
            <button 
              onClick={() => handleFilterChange('prototype')}
              className={`px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md ${
                activeFilter === 'prototype' ? 'bg-primaryColor text-white' : 'bg-primaryColor/10 text-foreground'
              }`}
            >
              Prototype {activeFilter === 'prototype' && <IoClose onClick={(e) => { e.stopPropagation(); clearFilter('prototype'); }} />}
            </button>
            <button 
              onClick={() => handleFilterChange('smart contract')}
              className={`px-3 flex gap-1 items-center justify-center py-2 text-sm rounded-md ${
                activeFilter === 'smart contract' ? 'bg-primaryColor text-white' : 'bg-primaryColor/10 text-foreground'
              }`}
            >
              Smart contract {activeFilter === 'smart contract' && <IoClose onClick={(e) => { e.stopPropagation(); clearFilter('smart contract'); }} />}
            </button>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredProjects.map((project) => (
                <div key={project.projectId} className="max-w-full sm:max-w-[300px] rounded-lg overflow-hidden ">
                    <Image 
                      src={`/images/${project.projectImage}`}
                      alt={`${project.projectName} image`} 
                      width={300} 
                      height={200} 
                      className='object-cover w-full h-[200px]' 
                    />
                    <div className="py-2 text-primaryColor flex items-center justify-between">
                        <div className="flex items-center justify-center gap-1">
                            <span className="w-8 h-8 rounded-full bg-green-300"></span>
                            <div>
                              <h3 className="font-medium">{project.projectName}</h3>
                              <p className="text-sm">{project.description}</p>
                            </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">
                            Collaborate
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techUsed.map((tech, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProjectPage