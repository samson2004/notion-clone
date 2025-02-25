'use client';
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
  
const Breadcrumbs = () => {
    const pathname=usePathname();
    const docname=pathname.split('/')[2];
    console.log(pathname);
  return (
    <div>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/">doc</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={pathname}>{docname}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
</Breadcrumb>

    </div>
  )
}

export default Breadcrumbs