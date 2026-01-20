import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24'>
            <div className='flex flex-col md:flex-row justify-between gap-24'>
                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <Link href="/">
                        <div className='text-2xl tracking-wide'>LUNA</div>
                    </Link>
                    <p>Almonesson Rd, Westville, New Jersey(NJ), 08093</p>
                    <span className='font-semibold'>info@luna.io</span>
                    <span className='font-semibold'>+1 234 56789</span>
                    <div className='flex gap-6'>
                        <Image className='cursor-pointer' src={"/facebook.png"} alt='facebook' width={16} height={16} />
                        <Image className='cursor-pointer' src={"/instagram.png"} alt='instagram' width={16} height={16} />
                        <Image className='cursor-pointer' src={"/youtube.png"} alt='youtube' width={16} height={16} />
                        <Image className='cursor-pointer' src={"/pinterest.png"} alt='pinterest' width={16} height={16} />
                        <Image className='cursor-pointer' src={"/x.png"} alt='x' width={16} height={16} />
                    </div>
                </div>



                <div className='hidden lg:flex justify-between w-1/2'>
                    <div className='flex flex-col gap-6'>
                        <h2 className='font-medium text-lg'>COMPANY</h2>
                        <div className='flex flex-col justify-between h-full'>
                            <Link href="/">About Us</Link>
                            <Link href="/">Careers</Link>
                            <Link href="/">Affiliates</Link>
                            <Link href="/">Blog</Link>
                            <Link href="/">Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h2 className='font-medium text-lg'>SHOP</h2>
                        <div className='flex flex-col justify-between h-full'>
                            <Link href="/">New Arrivals</Link>
                            <Link href="/">Accessories</Link>
                            <Link href="/">Men</Link>
                            <Link href="/">Women</Link>
                            <Link href="/">All Products</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h2 className='font-medium text-lg'>HELP</h2>
                        <div className='flex flex-col justify-between h-full'>
                            <Link href="/">Customer Service</Link>
                            <Link href="/">My Account</Link>
                            <Link href="/">Find a Store</Link>
                            <Link href="/">Legal & Privacy</Link>
                            <Link href="/">Gift Card</Link>
                        </div>
                    </div>
                </div>




                <div className='w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8'>
                    <h2 className='font-medium text-lg'>SUBSCRIBE</h2>
                    <p>Be the firs to get the latest news about trends, promotions, and much more!</p>
                    <div className='flex'>
                        <input type="email" placeholder='Email Address' className='p-4 w-3/4' />
                        <button className='w-1/4 bg-luna text-white'>JOIN</button>
                    </div>
                    <span className='font-semibold'>Secure Payments</span>
                    <div className='flex justify-between'>
                        <Image className='cursor-pointer' src={"/discover.png"} alt='discover' width={40} height={20} />
                        <Image className='cursor-pointer' src={"/skrill.png"} alt='skrill' width={40} height={20} />
                        <Image className='cursor-pointer' src={"/paypal.png"} alt='paypal' width={40} height={20} />
                        <Image className='cursor-pointer' src={"/mastercard.png"} alt='mastercard' width={40} height={20} />
                        <Image className='cursor-pointer' src={"/visa.png"} alt='visa' width={40} height={20} />
                    </div>
                </div>
            </div>



            <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-16'>
                <div>© {new Date().getFullYear()} Luna Shop</div>
                <div className='flex flex-col gap-8 md:flex-row'>
                    <div>
                        <span className='text-gray-500 mr-4'>Language</span>
                        <span className='font-medium'>United States | English</span>
                    </div>
                    <div>
                        <span className='text-gray-500 mr-4'>Currency</span>
                        <span className='font-medium'>$ USD</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;