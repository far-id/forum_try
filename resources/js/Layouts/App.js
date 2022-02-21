import React, { useState } from 'react';
import { Head } from '@inertiajs/inertia-react'
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';

export default function App({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />
            <Navbar />

            <div className="flex mx-12 my-8">
                <div className='hidden w-1/5 pl-2 pr-12 lg:block'>
                    <Sidebar />
                </div>
                <div className='w-4/5'>
                    {children}
                </div>
                
            </div>
        </div>
    );
}
