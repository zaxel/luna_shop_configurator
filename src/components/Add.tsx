"use client"

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useEffect, useState } from "react";

const Add = ({ 
    productId, 
    variantId, 
    stockNumber 
}: { 
    productId: string;
    variantId: string;
    stockNumber: number;
}) => {
    const [quantity, setQuantity] = useState(1);
    const wix = useWixClient();
    const { addItem, isLoading } = useCartStore();

    const handleQuantityChange = (op: "i" | "d") => {
        if (op === "i" && quantity < stockNumber) {
            setQuantity(prev => prev + 1);
        }
        if (op === "d" && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    useEffect(() => {
        if (stockNumber <= 0) {
            setQuantity(0);
        } else if (quantity > stockNumber) {
            setQuantity(stockNumber);
        } else if (quantity === 0 && stockNumber > 0) {
            setQuantity(1);
        }
    }, [stockNumber]); 

    const isOutOfStock = stockNumber <= 0;
    const isLowStock = stockNumber > 0 && stockNumber <= 5;

    return (
        <div className='flex flex-col gap-4'>
            <h4 className='font-medium'>Choose a Quantity</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex justify-between items-center w-32">
                        <button 
                            disabled={quantity <= 1 || isOutOfStock} 
                            onClick={() => handleQuantityChange("d")} 
                            className="cursor-pointer text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button 
                            disabled={quantity >= stockNumber || isOutOfStock} 
                            onClick={() => handleQuantityChange("i")} 
                            className="cursor-pointer text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            +
                        </button>
                    </div>
                    
                    {isOutOfStock ? (
                        <div className="text-sm text-red-500">
                            Out of stock
                        </div>
                    ) : isLowStock ? (
                        <div className="text-sm">
                            Only <span className="text-orange-500">{stockNumber} items</span> left!<br />
                            Don&apos;t miss it
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">
                            {stockNumber} items available
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={() => addItem(wix, productId, variantId, quantity)} 
                    disabled={isOutOfStock || isLoading || quantity <= 0} 
                    className='w-36 text-sm rounded-3xl ring-1 ring-luna text-luna py-2 px-4 hover:bg-luna hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-pink-200 transition-colors'
                >
                    {isLoading ? "Adding..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default Add;