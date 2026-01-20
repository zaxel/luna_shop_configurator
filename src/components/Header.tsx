import Link from 'next/link';
import React from 'react';
import BurgerMenu from './BurgerMenu';
import Image from 'next/image';
import SearchBar from './SearchBar';
import HeaderIcons from './HeaderIcons';

const Header = () => {
    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            {/*mobile*/}
            <div className='h-full flex items-center justify-between relative md:hidden'>

                <Link href="/">
                    <div className='text-2xl tracking-wide'>LUNA</div>
                </Link>
                <BurgerMenu />
            </div>
            {/*tablets*/}
            <div className='hidden md:flex justify-between items-center gap-8 h-full '>
                {/*left*/}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link href="/" className='flex items-center gap-3'>
                        <Image src="/logo.png" alt="main logo" height={24} width={24} />
                        <div className='text-2xl tracking-wide'>LUNA</div>
                    </Link>
                    <div className='hidden xl:flex gap-4'>
                        <Link href="/">Home</Link>
                        <Link href="/">Shop</Link>
                        <Link href="/">Deal</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>
                    </div>
                </div>
                {/*right*/}
                <div className='w-2/3 xl:w-1-2 flex justify-between items-center gap-8'>
                    <SearchBar />
                    <HeaderIcons />
                </div>
            </div>
        </div>
    );
};

export default Header;