"use client"
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { currentCart } from "@wix/ecom";
import { media as wixMedia } from "@wix/sdk";
import Image from 'next/image';
import React, { useEffect } from 'react';


const CartModal = () => {
    const wixClient = useWixClient();
    const { cart, isLoading, removeItem, getCart } = useCartStore();

    // Load cart on mount
    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);

    const handleCheckout = async () => {
        console.log("checkout")
        // try {
        //     const checkout =
        //         await wixClient.currentCart.createCheckoutFromCurrentCart({
        //             channelType: currentCart.ChannelType.WEB,
        //         });

        //     const { redirectSession } =
        //         await wixClient.redirects.createRedirectSession({
        //             ecomCheckout: { checkoutId: checkout.checkoutId },
        //             callbacks: {
        //                 postFlowUrl: window.location.origin,
        //                 thankYouPageUrl: `${window.location.origin}/success`,
        //             },
        //         });

        //     if (redirectSession?.fullUrl) {
        //         window.location.href = redirectSession.fullUrl;
        //     }
        // } catch (err) {
        //     console.error("Checkout failed:", err);
        //     alert("Failed to proceed to checkout. Please try again.");
        // }
    };

    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
            {isLoading ? (
                <div className="text-center py-4">Loading...</div>
            ) : !cart.lineItems || cart.lineItems.length === 0 ? (
                <div className="">Cart is Empty</div>
            ) : (
                <>
                    <h2 className="text-xl">Shopping Cart</h2>
                    {/* LIST */}
                    <div className="flex flex-col gap-8">
                        {/* ITEM */}
                        {cart.lineItems.map((item) => (
                            <div className="flex gap-4" key={item._id}>
                                {item.image && (
                                    <Image
                                        src={wixMedia.getScaledToFillImageUrl(
                                            item.image,
                                            72,
                                            96,
                                            {}
                                        )}
                                        alt={item.productName?.original || "Product"}
                                        width={72}
                                        height={96}
                                        className="object-cover rounded-md"
                                    />
                                )}
                                <div className="flex flex-col justify-between w-full">
                                    {/* TOP */}
                                    <div className="">
                                        {/* TITLE */}
                                        <div className="flex items-center justify-between gap-8">
                                            <h3 className="font-semibold">
                                                {item.productName?.original}
                                            </h3>
                                            <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                                                {item.quantity && item.quantity > 1 && (
                                                    <div className="text-xs text-green-500">
                                                        {item.quantity} x{" "}
                                                    </div>
                                                )}
                                                ${item.price?.amount}
                                            </div>
                                        </div>
                                        {/* DESC */}
                                        <div className="text-sm text-gray-500">
                                            {item.availability?.status}
                                        </div>
                                    </div>
                                    {/* BOTTOM */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Qty. {item.quantity}</span>
                                        <span
                                            className={`text-blue-500 ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-blue-700'}`}
                                            onClick={() => !isLoading && removeItem(wixClient, item._id!)}
                                        >
                                            Remove
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* BOTTOM */}
                    <div className="">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">${(cart as any)?.subtotal?.amount ?? 0}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300 hover:bg-gray-50">
                                View Cart
                            </button>
                            <button
                                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 hover:bg-gray-800"
                                disabled={isLoading}
                                onClick={handleCheckout}
                            >
                                {isLoading ? "Processing..." : "Checkout"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;