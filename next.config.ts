import type { NextConfig } from "next";

type RemotePattern = {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
};

const DEFAULT_REMOTE_PATTERNS: RemotePattern[] = [
  { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
  { protocol: "http", hostname: "127.0.0.1", port: "1337", pathname: "/uploads/**" },
  { protocol: "http", hostname: "0.0.0.0", port: "1337", pathname: "/uploads/**" },
  // Add your custom admin domain
  { protocol: "https", hostname: "admin.scaleIndia.in", pathname: "/**" },
  // Add Strapi Cloud support
  { protocol: "https", hostname: "*.media.strapiapp.com", pathname: "/**" },
];

const remotePatterns: RemotePattern[] = [...DEFAULT_REMOTE_PATTERNS];

const deriveUploadsPathname = (pathname: string): string => {
  if (!pathname || pathname === "/" || pathname === "//") {
    return "/uploads/**";
  }

  const trimmed = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const prefixed = `${trimmed}/uploads/**`;
  return prefixed.startsWith("/") ? prefixed : `/${prefixed}`;
};

const appendStrapiRemotePattern = (rawUrl: string | undefined) => {
  if (!rawUrl) {
    return;
  }

  try {
    const normalized = rawUrl.replace(/\/api\/?$/, "");
    const parsed = new URL(normalized);
    const protocolValue = parsed.protocol.replace(":", "");

    if (protocolValue !== "http" && protocolValue !== "https") {
      return;
    }

    const pattern: RemotePattern = {
      protocol: protocolValue,
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: deriveUploadsPathname(parsed.pathname),
    };

    const alreadyExists = remotePatterns.some(
      (existing) =>
        existing.protocol === pattern.protocol &&
        existing.hostname === pattern.hostname &&
        (existing.port || "") === (pattern.port || "") &&
        existing.pathname === pattern.pathname
    );

    if (!alreadyExists) {
      remotePatterns.push(pattern);
    }
  } catch (error) {
    console.warn(`[next.config] Failed to derive remote image pattern from '${rawUrl}'`, error);
  }
};

appendStrapiRemotePattern(process.env.NEXT_PUBLIC_STRAPI_ASSET_URL);
appendStrapiRemotePattern(process.env.NEXT_PUBLIC_STRAPI_API_URL);

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    // Disable image optimization in development to allow localhost images
    // that resolve to private IPs (127.0.0.1)
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
