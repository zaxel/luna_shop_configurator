"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';


const BurgerMenu = () => {
    const [open, setOpen] = useState(false);
    const wixClient = useWixClient();
    const { counter } = useCartStore();

    return (
        <div>
            <Image src="/menu.png" alt='burger menu button' width={28} height={28} className='cursor-pointer' onClick={()=>setOpen(prev => !prev)}/>
            {open && <div className='absolute w-full bg-black text-white left-0 top-20 h-[calc(100dvh-80px)] flex flex-col justify-center items-center gap-8 text-xl'>
                <Link href="/">Home</Link>
                <Link href="/">Shop</Link>
                <Link href="/">Deal</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
                <Link href="/">LogOut</Link>
                <Link href="/">Cart ({counter ?? 0})</Link>
            
            </div>}
        </div>
    );
};

export default BurgerMenu;