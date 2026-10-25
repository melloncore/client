import { apiRequest } from "./http";

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export async function sendContactMessage(message: ContactMessage): Promise<{ success: boolean; id: string }> {
  return apiRequest("/contact", {
    method: "POST",
    body: JSON.stringify(message),
  });
}
