"use client"
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({images}: {images: string[]}) => {
    const [image, setImage] = useState(0);
    
    return (
        <div>
            <div className='h-[500px] relative'>
                <Image className='object-cover rounded-md' src={images[image]} alt='main product' fill sizes='50vw' />
            </div>
            <ul className='flex justify-between gap-4 mt-8'>
                {images.map((image, index) => {
                    return <li key={image} className='relative w-1/4 h-32 gap-4 cursor-pointer'>
                            <Image onClick={()=>setImage(index)} className='object-cover rounded-md' src={image} alt='main product' fill sizes='30vw' />
                    </li>
                })}

            </ul>
        </div>
    );
};

export default ProductImages;