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

    const arrayBuffer = await response.arrayBuffer();

    // Set appropriate headers for PDF
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Length", arrayBuffer.byteLength.toString());
    headers.set("Access-Control-Allow-Origin", "*");

    // Add caching headers
    headers.set(
      "Cache-Control",
      `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`
    );

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("PDF proxy error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error fetching PDF",
      { status: 500 }
    );
  }
}

// Increase the default body size limit for PDF files
export const config = {
  api: {
    responseLimit: false,
  },
};
