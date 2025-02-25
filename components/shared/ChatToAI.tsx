'use client';

import * as Y from "yjs";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import React, { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Bot } from "lucide-react";
import { Input } from "../ui/input";

const ChatToAI = ({ doc }: { doc: Y.Doc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [question, setQuestion] = useState(""); // Track input
    const [answer, setAnswer] = useState("");
    const pathname = usePathname();

    const handleAskAI = (e: FormEvent) => {
        e.preventDefault();

        if (!question.trim()) {
            toast.error("Please enter a question.");
            return;
        }

        const documentStore = doc.get("document-store").toJSON();
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            try {
                const response = await fetch(
                    `https://green-base-7f2d.samsonzacharia1973.workers.dev/chattoai`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            documentdata: documentStore,
                            question: question, // Send user question
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                
                // Handle the structured response format
                if (typeof result === "string") {
                    setAnswer(result);
                } else if (result.response) {
                    setAnswer(result.response);
                } else {
                    setAnswer("No response received from AI.");
                }

            } catch (error) {
                console.error("Error fetching AI response:", error);
                toast.error("Failed to get AI response.");
            }
        });
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline">
                    <AlertDialogTrigger>
                        Chat with AI <Bot />
                    </AlertDialogTrigger>
                </Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex">
                            Ask AI About Your Document
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Type your question about the document below.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <hr />

                    {/* Show AI response */}
                    {answer && (
                        <div className="bg-gray-200 w-full p-4 rounded-2xl">
                            <p className="text-lg font-semibold flex items-center">
                                <Bot className="mr-2" />
                                AI says:
                            </p>
                            <p className="font-bold text-sm">{answer}</p>
                        </div>
                    )}

                    {/* User Input */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Input
                            placeholder="Ask AI about your document..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />

                        <AlertDialogFooter className="flex justify-end gap-3">
                            <Button
                                variant="default"
                                onClick={handleAskAI}
                                disabled={isPending}
                            >
                                {isPending ? "Generating..." : "Ask"}
                            </Button>
                            <AlertDialogCancel
                                onClick={() => {
                                    setIsOpen(false);
                                    setAnswer("");
                                    setQuestion("");
                                }}
                            >
                                Cancel
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ChatToAI;
