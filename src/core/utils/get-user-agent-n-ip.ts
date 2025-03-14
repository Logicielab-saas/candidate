/**
 * getUserAgentAndIp - Retrieves user agent and IP address from request headers
 *
 * @param headersList - The HTTP headers object from Next.js
 * @returns A string combining the user agent and IP address
 */
export async function getUserAgentAndIp(headersList: Headers): Promise<string> {
  const userAgentHeader = headersList.get("user-agent") || "unknown";
  const rawIpAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const normalizedIpAddress = rawIpAddress.startsWith("::ffff:")
    ? rawIpAddress.substring(7)
    : rawIpAddress;

  return `${userAgentHeader}/${normalizedIpAddress}`;
}
