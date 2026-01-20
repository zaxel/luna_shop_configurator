"use client"
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react';
import Add from './Add';
import { colorMap } from '@/const/colorMap';
import { useSelectedVariantStore } from '@/hooks/useSelectedVariants';

const CustomizeProduct = ({ productId, options, variants }: { productId: string, options: products.ProductOption[], variants: products.Variant[] }) => {

    const initialOptions = options?.reduce<Record<string, string>>(
        (acc, opt) => {
            const name = opt.name;
            const value = opt.choices?.[0]?.value;
            if (name && value) {
                acc[name] = value;
            }
            return acc;
        }, {}
    ) ?? {};

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);

    const handleOptionsSelect = (option: string, choice: string) => {
        setSelectedOptions(prev => ({ ...prev, [option]: choice }));
    }

    const selectedVariant = useSelectedVariantStore(
        (state) => state.selectedVariant
    );

    const setSelectedVariant = useSelectedVariantStore(
        (state) => state.setSelectedVariant
    );

    useEffect(() => {
        const variant = variants.find((v) => {
            const variantChoices = v.choices;
            if (!variantChoices) return false;
            return Object.entries(selectedOptions).every(
                ([key, value]) => variantChoices[key] === value
            );
        });
        setSelectedVariant(variant);
    }, [selectedOptions, variants]);


    if (!options || !options.length)
        return null;

    return (
        <>
            <ul className='flex flex-col gap-6'>
                {options.map((option: any) => {
                    return <li key={option.name}>
                        <h4 className='font-medium mb-3'>Choose a {option.name}</h4>
                        {option.name === "Color"
                            ? <ul className='flex items-center gap-3'>
                                {option.choices?.map((choice: any) => {
                                    if (!choice.inStock) {
                                        return (<li key={choice.value} className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative`} style={{ backgroundColor: colorMap[choice.value] }}>
                                            <div className='absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                                        </li>)
                                    }
                                    return (<li onClick={() => handleOptionsSelect(option.name, choice.value)} key={choice.value} className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative`} style={{ backgroundColor: colorMap[choice.value] }}>
                                        {selectedOptions.Color === choice.value && <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>}
                                    </li>)
                                })}
                            </ul>
                            : <ul className='flex items-center gap-3'>
                                {option.choices?.map((choice: any) => {
                                    if (!choice.inStock) {
                                        return (<li key={choice.value} className='ring-1 ring-pink-200 text-white rounded-md bg-pink-200 py-1 px-4 text-sm cursor-not-allowed'>
                                            {choice.value}
                                        </li>)
                                    }
                                    return ((choice.value === selectedOptions.Size)
                                        ? <li key={choice.value} className='ring-1 ring-luna text-white bg-luna rounded-md py-1 px-4 text-sm '>
                                            {choice.value}
                                        </li>
                                        : <li key={choice.value} onClick={() => handleOptionsSelect(option.name, choice.value)} className='ring-1 ring-luna text-luna rounded-md py-1 px-4 text-sm cursor-pointer'>
                                            {choice.value}
                                        </li>)
                                })}
                            </ul>}
                    </li>
                })}
            </ul>
            <Add productId={productId} variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"} stockNumber={selectedVariant?.stock?.quantity || 0} />
        </>
    );
};

export default CustomizeProduct;