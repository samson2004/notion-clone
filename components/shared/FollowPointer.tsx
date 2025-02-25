import React from 'react'
import {motion} from 'framer-motion';
import StringtoColor from '@/lib/hooks/stringtoColor';

const FollowPointer = ({info,x,y}:{info:{
    name:string,
    email:string,
    avatar:string
},x:number,y:number}) => {
  const color=StringtoColor(info.email||'1');
  return (
    <motion.div className='h-3 w-4 rounded-full absolute z-50'
    style={{
      top:y,
      left:x,
      pointerEvents:'none'
    }}
    initial={{
      scale:1,
      opacity:1
    }}
    animate={{
      scale:1,
      opacity:1
    }}
    exit={{
      scale:1,
      opacity:1
    }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={color}
      stroke={color} 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      className="lucide lucide-mouse-pointer-2">
        <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 
        1-.947.063z"/>
      </svg>
        <motion.div style={{
      top:y,
      left:x,
      pointerEvents:'none'
    }}
    initial={{
      scale:0.5,
      opacity:0
    }}
    animate={{
      scale:1,
      opacity:1
    }}
    exit={{
      scale:0.5,
      opacity:0
    }}
    className={`px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full`}
    >
          {info.name || info.email}
        </motion.div>
    </motion.div>
  )
}

export default FollowPointer