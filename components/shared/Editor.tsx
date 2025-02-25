'use client';
import { useRoom, useSelf } from '@liveblocks/react';
import React, { useEffect, useState } from 'react'
import * as Y from 'yjs';
import {LiveblocksYjsProvider} from '@liveblocks/yjs';
import { Button } from '../ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { BlockNoteView } from '@blocknote/shadcn';
import { BlockNoteEditor }  from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import StringtoColor from '@/lib/hooks/stringtoColor';
import TranslateDocument from './TranslateDocument';
import ChatToAI from './ChatToAI';

type Editorprops={
  doc:Y.Doc;
  provider:any;
  darkMode:boolean;
}


function BlockNote({doc,provider,darkMode}:Editorprops) {

  const userinfo=useSelf((me)=>me.info);

  const editor:BlockNoteEditor=useCreateBlockNote({
    collaboration:{
      provider,
      fragment:doc.getXmlFragment('document-store'),
      user:{
        name:userinfo?.name,
        color:StringtoColor(userinfo?.email)
      }
    }
  })
  return (
    <div className='relative max-w-6xl mx-auto'>
      <BlockNoteView 
    editor={editor}
    theme={darkMode?"dark":"light"}

    /></div>
  )
}


const Editor = () => {
    const room=useRoom();
    const [doc,setdoc]=useState<Y.Doc>();
    const [provider,setprovider]=useState<LiveblocksYjsProvider>();
    const [darkMode,setdarkMode]=useState(false);

    const handledarkmode=()=>{
      setdarkMode(!darkMode);
    }

    const style=`hover:text-white 
    ${darkMode ? 
    'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700':
    'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'}`


    useEffect(()=>{
      const yDoc=new Y.Doc();
      const yProvider=new LiveblocksYjsProvider(room,yDoc);
      setdoc(yDoc);
      setprovider(yProvider);

      return(()=>{
        yDoc?.destroy();
        yProvider?.destroy();
      })


    },[room]);

    if(!doc|| !provider){
      return null;
    }

  return (
    <div className="max-w-6xl mx-auto pt-5">
        <div className='flex items-center justify-end mb-10 space-x-5'>
            {/* translate ai  */}
            <TranslateDocument doc={doc}/>
            {/* chattoai */}    
            <ChatToAI doc={doc} />

            {/* darkmode  */}
            <Button  className={style} onClick={handledarkmode}>{darkMode? <SunIcon/>:<MoonIcon/>
            }</Button>
        </div>

        {/* blocknote */}
        <BlockNote doc={doc} provider={provider} darkMode={darkMode}/>
    </div>
  )
}

export default Editor