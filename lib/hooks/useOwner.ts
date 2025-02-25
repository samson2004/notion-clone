import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function useOwner(){
    const {user}=useUser();
    const room=useRoom();
    const [isowner,setisowner]=useState(false);
    const [userinroom]=useCollection(
        user && query(collectionGroup(db,"rooms"),where ("roomId",'==',room.id))
    );

    useEffect(()=>{
        if(userinroom?.docs && userinroom.docs.length>0){
            const owner=userinroom.docs.filter((doc)=>doc.data().role=="Owner");
            if(owner.some((doc)=>doc.data().userId===user?.emailAddresses[0].toString())){
                setisowner(true);
            }
        }
    },[userinroom,user]);


    return isowner;

}

export default useOwner;