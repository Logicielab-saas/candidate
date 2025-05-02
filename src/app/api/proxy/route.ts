/**
 * Proxy API route for handling CORS issues with document viewing
 *
 * Fetches documents from storage and forwards them to the client
 * while handling CORS headers properly. Includes caching for better performance.
 */

import { NextRequest, NextResponse } from "next/server";

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 60 * 60;

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
      return new NextResponse("Missing URL parameter", { status: 400 });
    }

    const response = await fetch(url, {
      next: {
        revalidate: CACHE_DURATION,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    const blob = await response.blob();
    const headers = new Headers();

    // Forward content type and length
    headers.set(
      "Content-Type",
      response.headers.get("Content-Type") || "application/octet-stream"
    );
    headers.set("Content-Length", response.headers.get("Content-Length") || "");

    // Add caching headers
    headers.set(
      "Cache-Control",
      `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error fetching document",
      { status: 500 }
    );
  }
}

// Increase the default body size limit for PDF files
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};
