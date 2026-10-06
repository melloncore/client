const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (RAW_API_URL === undefined) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in the environment variables. Endpoint is required for API calls."
  );
}

// Works with "https://backend-pmz2.onrender.com", the same with "/api/v1",
// or an empty string (same-origin proxy).
const API_ORIGIN = RAW_API_URL.trim()
  .replace(/\/+$/, "")
  .replace(/\/api\/v1$/, "");

const LANDING_URL = `${API_ORIGIN}/api/v1/landing`;

export async function submitConsent(
  accepted: boolean,
  email?: string
): Promise<{ success: boolean } | null> {
  try {
    const response = await fetch(`${LANDING_URL}/consent`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accepted, ...(email ? { email } : {}) }),
    });

    if (!response.ok) {
      console.error("Failed to submit consent:", response.status, await response.text());
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting consent:", error);
    return null;
  }
}

export async function pingVisitor(): Promise<{ tracked: boolean } | null> {
  try {
    const response = await fetch(`${LANDING_URL}/ping`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to ping visitor:", response.status);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error pinging visitor:", error);
    return null;
  }
}