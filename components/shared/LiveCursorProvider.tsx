'use client';
import { useMyPresence, useOthers } from '@liveblocks/react';
import React from 'react'
import FollowPointer from './FollowPointer';

const LiveCursorProvider = ({children}:{children:React.ReactNode}) => {
  const [myPresence,updatemyPresence]=useMyPresence();
  const others=useOthers();

  function handlePointerMove(e:PointerEvent<HTMLDivElement>){
    const cursor={x:Math.floor(e.pageX),y:Math.floor(e.pageY)};
    updatemyPresence({cursor});
  }
  function handlePointerLeave(){
    updatemyPresence({cursor:null});
  }
  return (
    <div onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}>
      {others.filter((other)=>other.presence.cursor!=null).map(({connectionId,presence,info})=>(
        <FollowPointer 
        key={connectionId} 
        info={info}
        x={presence.cursor!.x}
        y={presence.cursor!.y}
        />
      ))}
      {children}
      </div>
  )
}

export default LiveCursorProvider