import { apiRequest } from "./http";
import type { BlogPost } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const blogApi = {
  async listPublished(): Promise<BlogPost[]> {
    const response = await apiRequest<ApiResponse<BlogPost[]>>("/blog/public");
    return response.data;
  },

  async getPublished(slug: string): Promise<BlogPost> {
    const response = await apiRequest<ApiResponse<BlogPost>>(
      `/blog/public/${encodeURIComponent(slug)}`,
    );
    return response.data;
  },
};
