'use client';
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Editor from "./Editor";
import useOwner from "@/lib/hooks/useOwner";
import DeleteDocument from "./DeleteDocument";
import Inviteuser from "./Inviteuser";
import Manageuser from "./Manageuser";
import Avatar from "./Avatar";

const Document = ({id}:{id:string}) => {
  const [inputvalue,setinputvalue]=useState("");
  const [isupdating,startTransition]=useTransition();
  const [data,loading,error]=useDocumentData(doc(db,'documents',id));
  const owner=useOwner();//custom hook

  useEffect(()=>{
    if(data){setinputvalue(data.title)}
  },[data])
  const updateTitle=async(e:FormEvent)=>{
    e.preventDefault();
    if(inputvalue.trim()){
      startTransition(async()=>{
        await updateDoc(doc(db,"documents",id),{
          title:inputvalue
        })
      })
    }
  }
  if(!data) return null;
  return (
    <div className="bg-white flex-1 h-full p-5">
          {/* update doc name */}
        <div className="max-w-6xl mx-auto mb-5">
          <form action="" className="flex-1" onSubmit={updateTitle}>
            <div className="flex space-x-4">
            <Input  value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)} ></Input>
            <Button disabled={isupdating} type="submit">{isupdating?"Updating":"Update"}</Button>
            {owner && (
              <>
              <Inviteuser />
              <DeleteDocument  />
              </>
            )}
            </div>
          </form>
        </div>

        <div className=" flex  max-w-6xl justify-between items-center mb-5 mx-auto">
            <Manageuser />
            <Avatar />
        </div>
        
        <hr className="pb-10 max-w-6xl mx-auto"/>
        <Editor  />
    </div>
  )
}

export default Document