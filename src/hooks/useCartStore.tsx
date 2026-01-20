import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClientType } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClientType) => void;
  addItem: (
    wixClient: WixClientType,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClientType, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,
  getCart: async (wixClient) => {
    set({ isLoading: true });
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      
      const totalQuantity = cart?.lineItems?.reduce((total, item) => {
        return total + (item.quantity || 0);
      }, 0) || 0;
      
      set({
        cart: cart || [],
        isLoading: false,
        counter: totalQuantity, 
      });
    } catch (err) {
      console.error("Failed to get cart:", err);
      set({ isLoading: false });
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set({ isLoading: true });
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID || "1380b703-ce81-ff05-f115-39571d94dfcd",
              catalogItemId: productId,
              ...(variantId ? { options: { variantId } } : {}),
            },
            quantity: quantity,
          },
        ],
      });

      const totalQuantity = response.cart?.lineItems?.reduce((total, item) => {
        return total + (item.quantity || 0);
      }, 0) || 0;

      set({
        cart: response.cart,
        counter: totalQuantity, 
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      set({ isLoading: false });
    }
  },
  removeItem: async (wixClient, itemId) => {
    set({ isLoading: true });
    try {
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
        [itemId]
      );

      const totalQuantity = response.cart?.lineItems?.reduce((total, item) => {
        return total + (item.quantity || 0);
      }, 0) || 0;

      set({
        cart: response.cart,
        counter: totalQuantity, 
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
      set({ isLoading: false });
    }
  },
}));