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
  { params }: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams.path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams.path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams.path, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams.path, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
): Promise<Response> {
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

    // Get the original content type
    const contentType =
      request.headers.get("Content-Type") || "application/json";

    // Prepare the request body based on content type
    let body: string | FormData | undefined;
    const headers: Record<string, string> = {};

    // Copy original headers except problematic ones
    request.headers.forEach((value, key) => {
      if (
        !["content-length", "host", "connection"].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    if (method !== "GET") {
      if (contentType.includes("multipart/form-data")) {
        body = await request.formData();
        // Let the fetch API handle the content-type header for FormData
        delete headers["content-type"];
      } else {
        body = await request.text();
      }
    }

    // Forward the request
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    // Handle the response based on its content type
    const responseContentType = response.headers.get("Content-Type") || "";

    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // For non-JSON responses, return as is
    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
