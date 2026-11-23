/**
 * Single source of truth for the backend base URL.
 * Used by BOTH the browser (src/hooks/api/http.ts) and the server (src/lib/blog.ts)
 * so they can never disagree. NEXT_PUBLIC_API_URL may be given with or without
 * the "/api/v1" suffix (.env.development has no suffix, .env.production has it).
 */
const DEFAULT_API = "https://api.melloncore.com/api/v1";

const configured = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "");

export const API_ROOT = configured
  ? configured.endsWith("/api/v1")
    ? configured
    : `${configured}/api/v1`
  : DEFAULT_API;
