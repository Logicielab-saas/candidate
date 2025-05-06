import { NextRequest, NextResponse } from "next/server";

/**
 * ProxyHandler - Proxies API requests to the backend server
 *
 * This handler forwards all API requests to the actual backend server while
 * hiding the real API endpoint from the client. It maintains headers,
 * method, and body of the original request.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  return handleRequest(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  return handleRequest(request, path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  return handleRequest(request, path, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = await params;
  return handleRequest(request, path, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL not configured");
    }

    // Reconstruct the path from segments
    const path = pathSegments.join("/");

    // Get search params
    const searchParams = new URL(request.url).searchParams;
    const queryString = searchParams.toString();

    // Construct the full URL
    const url = `${apiUrl}${path}${queryString ? `?${queryString}` : ""}`;

    // Forward the request
    const response = await fetch(url, {
      method,
      headers: {
        ...Object.fromEntries(request.headers),
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? await request.text() : undefined,
    });

    // Forward the response
    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
