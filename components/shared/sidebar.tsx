'use client';
import {useCollection} from 'react-firebase-hooks/firestore';
import React, { useEffect, useState } from 'react'
import NewDocumentButton from '@/components/shared/NewDocumentButton';
import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import Sidebaroption from './sidebaroption';

interface RoomDocument extends DocumentData{
    createdAt:string,
    role:'Owner'|'Editor',
    roomId:string,
    userId:string
}

const Sidebar = () => {
    const {user}=useUser();
    const [GroupedData,setGroupedData]=useState(
        {
            owner:[],
            editor:[],
        }
    );
    const [data,loading,error]=useCollection(
        user && (
            query(collectionGroup(db,'rooms') ,
            where('userId','==',user.emailAddresses[0].toString()))
        )
    )
    useEffect(()=>{
        if(!data){
            return;
        }
        const grouped=data.docs.reduce<{
            owner:RoomDocument[];
            editor:RoomDocument[];
        }>(
            (acc, curr)=>{
                const roomData=curr.data() as RoomDocument;

                if(roomData.role==="Owner"){
                    acc.owner.push({
                        id:curr.id,
                        ...roomData
                    })
                }
                else{
                    acc.editor.push({
                        id:curr.id,
                        ...roomData,
                    })
                }
                return acc;
            },{
                owner:[],
                editor:[],
            }

        )

        setGroupedData(grouped);
    },[data])


    const menuoptions=(
        <>
        <NewDocumentButton />
       {/* mydocuments */}
       <div className='flex flex-col py-4 space-y-4 md:max-w-36'>
       {GroupedData.owner.length === 0 ? (
            <h2 className='text-sm mt-5'>No documents created</h2>
        ) : (
            <>
                <h2 className='text-lg mt-10'>My Documents</h2>
                {GroupedData.owner.map((doc: any) => (
                    <Sidebaroption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                ))}
            </>
        )}
       </div>

        

        {/* shared with me  */}
        <div className='flex flex-col py-4 space-y-4 md:max-w-36'>
        {GroupedData.editor.length===0?(
            <h2 className='text-md mt-10'>Shared with me</h2>
        ):(
            <>
            <h2 className='text-md font-semibold mt-10'>Shared with me</h2>
            {GroupedData.editor.map((doc:any)=>(
                <Sidebaroption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/ >
            ))}
            </>
        )}
        </div>
        </>
    );
  return (
    <div className='p-2 md:p-5 bg-gray-200 relative'>
        <Sheet>
        <SheetTrigger  className='md:hidden p-2'>
            <Menu className='rounded-lg  hover:opacity-30'></Menu>     
        </SheetTrigger>
        <SheetContent side={'left'}>
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div>
                {menuoptions}
            </div>
            
            </SheetHeader>
        </SheetContent>
        </Sheet>
        <div className='hidden md:inline'>    
            {menuoptions}
        </div>    
    </div>
  )
}

export default Sidebar