"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CartModal from './CartModal';
import { useCartStore } from '@/hooks/useCartStore';

const HeaderIcons = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const router = useRouter();
    const loggedIn = false;

    const { counter } = useCartStore();

    const handleProfileClick = () => {
        if (!loggedIn) {
            router.push("/login");
        }
        setProfileOpen(prev => !prev);
    }
    const handleCartClick = () => {
        setCartOpen(prev => !prev);
    }

    return (
        <div className='flex justify-between items-center gap-4 lg:gap-6 relative'>
            <Image onClick={handleProfileClick} src="/profile.png" alt="profile" height={22} width={22} className='cursor-pointer' />
            {profileOpen && <div className='absolute p-4 top-12 left-0 rounded-md text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20'>
                <Link href="/" className=''>Profile</Link>
                <div className='cursor-pointer mt-2 text-red-600'>LogOut</div>
            </div>}

            <Image src="/notification.png" alt="notification" height={22} width={22} className='cursor-pointer' />

            <div onClick={handleCartClick} className='relative cursor-pointer'>
                <Image src="/cart.png" alt="cart" height={22} width={22} className='cursor-pointer' />
                <div className='absolute -top-4 -right-4 w-6 h-6 bg-luna rounded-full text-white text-sm flex items-center justify-center'>{counter}</div>
            </div>
            {cartOpen && <CartModal />}


        </div>
    );
};

export default HeaderIcons;