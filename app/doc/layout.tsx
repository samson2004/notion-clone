'use client';
import React from 'react'
import LiveBlockProvider from '@/components/shared/LiveBlockProvider'
const PageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <LiveBlockProvider>{children}</LiveBlockProvider>
  )
}

export default PageLayout