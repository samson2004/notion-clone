'use server';

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "../hooks/liveblocks";
import { collection, collectionGroup } from "firebase/firestore";
import { db } from "@/firebase";

export async function createnewDocument(){
    const  { sessionClaims }=await auth();
    console.log('sessionclaims from lib/actioins/actions.ts ::',sessionClaims);

    //create document
    const docCollectionRef=adminDb.collection("documents");
    const docRef=await docCollectionRef.add({
        title:'New Doc'
    });

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId:sessionClaims?.email,
        role:'Owner',
        createdAt:new Date(),
        roomId:docRef.id
    })

    return {docId:docRef.id};
}

    export async function deletedocument(roomid:string) {
        auth.protect();
        try {
            await adminDb.collection('documents').doc(roomid).delete();

            const query=await adminDb.collectionGroup("rooms").where("roomId","==",roomid).get();
            const batch=adminDb.batch();
            query.docs.forEach((doc)=>{
                batch.delete(doc.ref);
            });

            await batch.commit();
            await liveblocks.deleteRoom(roomid);

            return {sucess:true};
        } catch (error) {
            console.log("error::",error);
            return {sucess:false};
        }
    }

export async function inviteusertoDocument(roomid: string, email: string) {
    
    auth.protect();
    console.log("room id :: actions.ts:: ",roomid,"email::",email);

    try {
        
        await adminDb.collection("users").doc(email).collection('rooms').doc(roomid).set({
            userId:email,
            role:'Editor',
            createAt:new Date(),
            roomId:roomid
        })

        return {sucess:true};
    } catch (error) {
        console.log("error",error);
        return {sucess:false};
    }
}
export async function deleteuserfromDocument(roomid:string,email:string) {
    auth.protect();
    console.log("room id :: actions.ts:: ",roomid,"email::",email);

    try {
        await adminDb.collection("users").doc(email).collection("rooms").doc(roomid).delete();
        return {sucess:true};
        
    } catch (error) {
        console.log("error",error);
        return {sucess:false};
    }

}