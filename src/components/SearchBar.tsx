"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchBar = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("search") as string;

        if(name){
            router.push(`/list/?name=${name}`);
        }
    }
    return (
        <form onSubmit={handleSearch} className='flex justify-between items-center gap-4 p-2 bg-gray-100 rounded-md flex-1'>
            <input type="search" name="search" placeholder='Search' className='flex-1 bg-transparent outline-none text-gray-800'/>
            <button className='cursor-pointer'>
                <Image src="/search.png" alt="search" width={16} height={16} />
            </button>
        </form>
    );
};

export default SearchBar;