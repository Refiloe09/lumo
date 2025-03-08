/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/clerk/user/[clerkUserId]/route.ts
import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache for 1 hour

// Handler for GET requests to fetch Clerk user details
export async function GET(
  request: Request,
  { params }: { params: { clerkUserId: string } }
) {
  try {
    const { clerkUserId } = params;

    // Check cache first
    const cachedUser = cache.get(clerkUserId);
    if (cachedUser) {
      return NextResponse.json(cachedUser);
    }

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "clerkUserId is required" },
        { status: 400 }
      );
    }

    // Fetch user details from Clerk API
    const response = await fetch(
      `https://api.clerk.com/v1/users/${clerkUserId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Use environment variable
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch user from Clerk: ${response.statusText}` },
        { status: response.status }
      );
    }

    const clerkUser = await response.json();

    // Extract relevant user details
    const primaryEmail = clerkUser.email_addresses?.find((email: any) => email.id === clerkUser.primary_email_address_id)?.email_address || null;
    const primaryPhone = clerkUser.phone_numbers?.find((phone: any) => phone.id === clerkUser.primary_phone_number_id)?.phone_number || null;

    const userData = {
      username: clerkUser.username || primaryEmail?.split("@")[0] || "Anonymous",
      profileImage: clerkUser.profile_image_url || null,
      email: primaryEmail,
      phone: primaryPhone,
    };

    // Cache the result
    cache.set(clerkUserId, userData);

    return NextResponse.json(userData);
  } catch (err) {
    console.error("Error fetching Clerk user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}