'use client';
import React from 'react'

import {
    RoomProvider as RoomProviderWrapper,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import FallbackSpinner from './FallbackSpinner';
import LiveCursorProvider from './LiveCursorProvider';
const RoomProvider = ({roomId,children}:{roomId:string,children:React.ReactNode}) => {
  return (
    <RoomProviderWrapper
        id={roomId}
        initialPresence={{cursor:null}}
    ><ClientSideSuspense fallback={<FallbackSpinner/>}>
        <LiveCursorProvider>
        {children}
        </LiveCursorProvider>
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}

export default RoomProvider