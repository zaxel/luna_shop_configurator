import { createClient, OAuthStrategy } from "@wix/sdk";
import { productsV3, infoSectionsV3, products  } from "@wix/stores";
import { categories } from "@wix/categories"; 
import { cookies } from "next/headers";

async function getRefreshToken() {
  try {
    const cookieStore = await cookies();
    return JSON.parse(cookieStore.get("refreshToken")?.value || "null");
  } catch {
    return null;
  }
}

export async function createWixClientServer() {
  const refreshToken = await getRefreshToken();

  return createClient({
    modules: {
      products,
      productsV3,
      categories, 
      infoSectionsV3,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!, 
      tokens: {
        refreshToken,
        accessToken: {
          value: "",
          expiresAt: 0,
        },
      },
    }),
  });
}