import getSecondaryImages from '@/lib/getSecondaryImagesV1';
import { getWixImageUrl } from '@/lib/getWixImageUrl';
import React from 'react';
import ProductImages from '../ProductImages';
import CustomizeProduct from '../CustomizeProduct';
import type { products } from '@wix/stores';

import { Canvas } from '@react-three/fiber'
import Trainers3dModelScene from '../Trainers3dModelScene';
import Picker from '../Picker';

type ProductCardProps = {
    item: products.Product;
};

const Product3DColorConfigurator = ({ item }: ProductCardProps) => {
    const mainDescription = item.description
        ? item.description.replace(/<[^>]*>/g, '')
        : 'No description available';

    const price = item.priceData?.price;
    const discountedPrice = item.priceData?.discountedPrice;
    const formattedPrice = item.priceData?.formatted?.price;
    const formattedDiscountedPrice = item.priceData?.formatted?.discountedPrice;

    const priceDisplay = discountedPrice
        ? formattedDiscountedPrice || `$${discountedPrice}`
        : formattedPrice || `$${price}`;

    const isOnSale =
        discountedPrice != null &&
        price != null &&
        discountedPrice < price;

    const mainImage = getWixImageUrl(item.media?.mainMedia?.image?.url || "/product.png");
    const secondaryImages = getSecondaryImages(item);
    const limitedSecondaryImages = secondaryImages.slice(0, 3);

    const additionalInfoSections = item.additionalInfoSections || [];

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16'>
            <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
                <div className='h-[500px] relative'>
                    <Trainers3dModelScene />
                </div>
            </div>

            <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                <h2 className='text-xl font-medium'>{item.name}</h2>
                <p className='text-gray-500'>{mainDescription}</p>
                <hr className='h-[2px] bg-gray-100' />
                <div className='flex justify-start gap-4'>
                    {isOnSale && (
                        <h4 className='text-xl text-gray-500 line-through'>
                            {formattedPrice || `$${price}`}
                        </h4>
                    )}
                    <h3 className='font-medium text-2xl'>{priceDisplay}</h3>
                </div>
                <hr className='h-[2px] bg-gray-100' />
                    <Picker />
                <hr className='h-[2px] bg-gray-100' />
                <CustomizeProduct productId={item?._id ?? "0000"} options={item?.productOptions ?? []} variants={item?.variants ?? []} />

                <hr className='h-[2px] bg-gray-100' />
                <ul>
                    {additionalInfoSections.map((section, index) => {
                        const description = section.description
                            ? section.description.replace(/<[^>]*>/g, '')
                            : 'No description available';

                        return <li key={index} className='text-sm mb-5'>
                            <h3 className='font-medium text-lg mb-4'>{section.title}</h3>
                            <p>{description}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Product3DColorConfigurator;