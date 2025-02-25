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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { deleteuserfromDocument } from "@/lib/actions/actions";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import useOwner from "@/lib/hooks/useOwner";

const Manageuser = () => {
    const [isopen, setisopen] = useState(false);
    const [ispending, startTransition] = useTransition();
    const pathname = usePathname();
    const { user } = useUser();
    const isOwner = useOwner();
    const room = useRoom();
    const [localuserdata, setlocaluserdata] = useState<any[]>([]); 

    const [userinRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );

    useEffect(() => {
        if (userinRoom) {
            const users = userinRoom.docs.map((doc) => doc.data());
            setlocaluserdata(users);
            console.log("Updated user data:", users);
        }
    }, [userinRoom]);

    const handledelete = async (email: string) => {
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const { sucess } = await deleteuserfromDocument(roomId, email);

            if (sucess) {
                setisopen(false);
                toast.success("User removed from Room!");

                setlocaluserdata((prevUsers) => prevUsers.filter((user) => user.userId !== email));
            } else {
                toast.error("Failed to remove");
            }
        });
    };

    return (
        <>
            <AlertDialog open={isopen} onOpenChange={setisopen}>
                <Button asChild variant="outline">
                    <AlertDialogTrigger>{`Users (${localuserdata.length})`}</AlertDialogTrigger>
                </Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Users with Access</AlertDialogTitle>
                        <AlertDialogDescription className="pb-5">
                            Below are the users who have access to this document.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <hr />
                    <div className="w-full space-y-3">
                        {localuserdata.map((docuser) => {
                            const you = user?.emailAddresses[0]?.emailAddress; 

                            return (
                                <div key={docuser.userId} className="flex items-center justify-between">
                                    <div className="text-sm font-bold mb-1">
                                        {you === docuser.userId ? `You (${docuser.userId})` : docuser.userId}
                                    </div>
                                    {docuser.role === "Editor" && (
                                        <Button
                                            className="text-sm rounded-xl"
                                            variant="destructive"
                                            disabled={ispending}
                                            onClick={() => handledelete(docuser.userId)}
                                        >
                                            Kick
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default Manageuser;
