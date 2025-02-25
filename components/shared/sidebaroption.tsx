'use client';

import { db } from '@/firebase';
import {doc} from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const Sidebaroption = ({href,id}:{href:string,id:string}) => {
    const [data,loading,error]=useDocumentData(doc(db,"documents",id));
    const pathname=usePathname();
    const isactive=href.includes(pathname) && pathname!="/";

    if(!data) return null;
  return (
    <Link href={href} className={`border p-2 rounded-md ${isactive?"bg-gray-300 font-bold border-black":"border-gray-400"}`}>
        <p className='truncate'>{data.title}</p>
        {/* truncate=asfafaf... */}
    </Link>
  )
}

export default Sidebaroption