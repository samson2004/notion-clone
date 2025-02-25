'use client';

import { useUser,SignedIn,SignedOut,SignInButton,UserButton  } from '@clerk/nextjs';
import React from 'react'
import Breadcrumbs from './Breadcrumbs';

const Header = () => {
  const {user}=useUser();
  return (
    <div className='flex items-center  justify-between p-5'>
      {user && (
        <h1 className='text-2xl'>{user?.firstName}{`'s Space`}</h1>)}

      {/* breadcrumbs */}

      <Breadcrumbs />

      {/* signin/signout */}
      <div>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default Header