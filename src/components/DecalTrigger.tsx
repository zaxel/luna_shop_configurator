"use client"
import { use3DTShirtStore } from '@/hooks/use3DTShirtStore';
import React from 'react';

const DecalTrigger = () => {
    const { decalOpen, setDecalOpen } = use3DTShirtStore();

    return (
        <>
            <h4 className='font-medium'>Add a sticker </h4>
            {decalOpen ? <button onClick={() => setDecalOpen(!decalOpen)} className='ring-1 ring-luna text-white bg-luna rounded-md py-1 px-4 text-sm w-fit'>
                Close Editor
            </button>
                : <button onClick={() => setDecalOpen(!decalOpen)} className='ring-1 ring-luna text-luna rounded-md py-1 px-4 text-sm w-fit'>
                    Open Editor
                </button>}
        </>
    );
};

export default DecalTrigger;