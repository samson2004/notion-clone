'use client';

import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { createnewDocument } from '@/lib/actions/actions';
const NewDocumentButton = () => {

  const [ispending,startTransition]=useTransition();
  const router=useRouter();
  const handlecreatenewdocument=async()=>{
    startTransition(async()=>{
      //start
      const {docId}=await createnewDocument();
      router.push(`/doc/${docId}`)
    }
    )
  };
  return (
    <div className=''>
        <Button onClick={handlecreatenewdocument} disabled={ispending}>
          {ispending?"creating...":"New Document"}
        </Button>
    </div>
  )
}

export default NewDocumentButton