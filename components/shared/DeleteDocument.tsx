'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { toast } from "sonner"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { deletedocument } from "@/lib/actions/actions";
const DeleteDocument = () => {

    const [isopen,setisopen]=useState(false);
    const [ispending,startTransition]=useTransition();
    const router=useRouter();
    const pathname=usePathname();

    const handledelete=async()=>{
        const roomId=pathname.split('/').pop();
        console.log("roomID::",roomId);
        if(!roomId) return;

        startTransition(async()=>{
            const {sucess}=await deletedocument(roomId);
            
            if(sucess){
                setisopen(false);
                router.replace('/');
                toast.success("Room deleted successfully!d");
            }else{
                toast.error('Failed to delete room');
            }
        })
    }
  return (
    <>
    
    <AlertDialog open={isopen} onOpenChange={setisopen}>
    <Button asChild variant={`destructive`}>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
    </Button>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your document
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <Button variant={`destructive`} onClick={handledelete} disabled={ispending}>{ispending ? "Deleting":"Delete"}</Button>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

export default DeleteDocument