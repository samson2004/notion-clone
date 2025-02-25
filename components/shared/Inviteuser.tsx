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
import {Input} from '../ui/input';
import React, { FormEvent, useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { inviteusertoDocument } from "@/lib/actions/actions";
const Inviteuser = () => {

    const [isopen,setisopen]=useState(false);
    const [ispending,startTransition]=useTransition();
    const [email,setemail]=useState("");
    const pathname=usePathname();

    const handleinvite=async(e:FormEvent)=>{
        e.preventDefault();

        const roomid=pathname.split('/').pop();
        if(!roomid) return;

        startTransition(async()=>{
            const {sucess}=await inviteusertoDocument(roomid,email);
            
            if(sucess){
                setisopen(false);
                setemail('');
                toast.success("User added to room successfully");
            }else{
                toast.error('Failed to Add user !');
            }
        })
    }
  return (
    <>
    
    <AlertDialog open={isopen} onOpenChange={setisopen}>
    <Button asChild variant={`outline`}>
        <AlertDialogTrigger>Invite</AlertDialogTrigger>
    </Button>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Who do u like to invite?</AlertDialogTitle>
      <AlertDialogDescription>
        Invite ur team  to increase your productivity !!
      </AlertDialogDescription>
    </AlertDialogHeader>
    <form onSubmit={handleinvite} className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <Input 
        type="email"
        placeholder="Email"
        className="w-full"
        value={email}
        onChange={(e)=>{
            setemail(e.target.value);
        }}
        ></Input>
        <AlertDialogFooter className="flex flex-col md:flex-row">
                <Button className="w-full" variant={'default'} disabled={ispending}>{ispending?"Inviting...":"Invite"}</Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
    </form>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

export default Inviteuser;