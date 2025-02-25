import React from 'react';
import Document from '@/components/shared/Document';


const DocumentPage = async({ params }: { params: { id: string } }) => {
  const { id } = await params;
  
  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <Document id={id} />
    </div>
  );
};

export default DocumentPage;
