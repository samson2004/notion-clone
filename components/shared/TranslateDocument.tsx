'use client';

import * as Y from "yjs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Languages, Bot } from "lucide-react";

type LangType =
    | "english"
    | "spanish"
    | "portugese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese";

const langOptions: LangType[] = [
    "english",
    "spanish",
    "portugese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [targetLang, setTargetLang] = useState<LangType>("english");
    const [translatedText, setTranslatedText] = useState("");
    const pathname = usePathname();

    const handleTranslate = (e: FormEvent) => {
        e.preventDefault();
        const documentStore = doc.get("document-store").toJSON();

        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            try {
                const response = await fetch(
                    `https://green-base-7f2d.samsonzacharia1973.workers.dev/translateDocument`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            documentdata: documentStore,
                            targetlang: targetLang,
                        }),
                    }
                );

                if (response.ok) {
                    const { translated_text } = await response.json();
                    setTranslatedText(translated_text);
                    toast.success("Document translated successfully!");
                } else {
                    console.error("Translation failed", response);
                    toast.error("Failed to translate the document");
                }
            } catch (error) {
                console.error("Error translating document:", error);
                toast.error("An error occurred while translating");
            }
        });
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <Button asChild variant="outline">
                    <AlertDialogTrigger>
                        Translate <Languages />
                    </AlertDialogTrigger>
                </Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex">
                            Translate Your Document | <Languages /> |
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Select the language for the document to be translated to.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <hr />

                    {/* Show translated content */}
                    {translatedText && (
                        <div className="bg-gray-200 w-full p-4 rounded-2xl">
                            <p className="text-lg font-semibold flex items-center">
                                <Bot className="mr-2" />
                                GPT says:
                            </p>
                            <p className="font-bold text-sm">{translatedText}</p>
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        {/* Language Selection */}
                        <Select onValueChange={(value) => setTargetLang(value as LangType)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {langOptions.map((lang, index) => (
                                    <SelectItem key={index} value={lang}>
                                        {lang}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Buttons */}
                        <AlertDialogFooter>
                            <Button
                                variant="default"
                                onClick={handleTranslate}
                                disabled={isPending}
                            >
                                {isPending ? "Translating..." : "Translate"}
                            </Button>
                            <AlertDialogCancel
                                onClick={() => {
                                    setIsOpen(false);
                                    setTranslatedText("");
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

export default TranslateDocument;
