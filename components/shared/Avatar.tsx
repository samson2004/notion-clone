'use client';
import { useOthers,useSelf } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Avatar = () => {

    const others=useOthers()
    const self=useSelf();

    const all=[self,...others];
  return (
    <TooltipProvider>
      <Tooltip>
    <div>
      <div className='flex items-center space-x-5'>
        <p className='text-xs  font-light'>Users  currently editing the page</p>
        <div className='flex -space-x-5'> 
        {
        all.map((user,index)=>{
          return (
            <>
            <div key={index} className=''>
                <TooltipTrigger><Image src={user.info.avatar} height={32} width={32} alt='avatar' className='rounded-full'/></TooltipTrigger>
            </div>
            <TooltipContent>
                  <p>{self.id==user.id?"You":user.info.name}</p>
            </TooltipContent>
            </>
          )
        })}
        </div>
        </div>
    </div>
    </Tooltip>
    </TooltipProvider>

  )
}

export default Avatar