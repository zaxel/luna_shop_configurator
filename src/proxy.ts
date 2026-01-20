import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const cookies = req.cookies;
  const res = NextResponse.next();

  if (cookies.get("refreshToken"))
    return res;

  try {
    const wixClient = createClient({
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!
      }),
    });

    const tokens = await wixClient.auth.generateVisitorTokens();

    res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/', 
    });

    return res;
  } catch (error) {
    console.error('Failed to generate visitor tokens:', error);
    return res;
  }
}