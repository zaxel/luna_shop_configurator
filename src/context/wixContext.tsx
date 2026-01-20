"use client";

import { createClient, OAuthStrategy } from '@wix/sdk'; 
import { productsV3, products, collections } from '@wix/stores'; 
import { currentCart } from "@wix/ecom";
import { redirects } from '@wix/redirects'; 
import { createContext, ReactNode } from 'react';

import Cookies from "js-cookie";

function getRefreshToken() {
  try {
    return JSON.parse(Cookies.get("refreshToken") || "null");
  } catch {
    return null;
  }
}

const wixClient = createClient({
  modules: {
    productsV3, 
    products,
    collections,
    currentCart,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken: getRefreshToken(),
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    },
  }),
});

export type WixClientType = typeof wixClient;
export const WixClientContext = createContext<WixClientType>(wixClient);

export const WixClientContextProvider = ({children}: {children: ReactNode}) => {
    return <WixClientContext.Provider value={wixClient}>{children}</WixClientContext.Provider>
}