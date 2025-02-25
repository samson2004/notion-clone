import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/hooks/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    auth.protect();
    
    const {sessionClaims}=await auth();
    const {room}=await req.json();

    const session=liveblocks.prepareSession(sessionClaims?.email!,{
        userInfo:{
            name:sessionClaims?.fullname!,
            email:sessionClaims?.email!,
            avatar:sessionClaims?.image!,
        }
    });

    const usersInRoom=await adminDb.collectionGroup('rooms')
    .where("userId","==",sessionClaims?.email).get();// users in room

    const userInRoom=usersInRoom.docs.find((doc)=>doc.id==room);// checking room id with user in room 

    if(userInRoom?.exists){
        session.allow(room,session.FULL_ACCESS);
        const {body,status}=await session.authorize();
        return new Response(body,{status});
    }else{
        return NextResponse.json({
            message:'You are not allowed in this room'
        },{status:403})
    }
}