
import RoomProvider from '@/components/shared/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const Doclayout = async(
    {children,params}:
    {children:React.ReactNode,params:{id:string}}
) => {
    auth.protect();
    const { id } = await params;
  return (
    <RoomProvider roomId={id}>{children}
    </RoomProvider>
  )
}

export default Doclayout;