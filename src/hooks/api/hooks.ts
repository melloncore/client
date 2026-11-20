import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query";
import type { BlogPost } from "@/types";
import { recordAnalyticsEvent, type AnalyticsEvent } from "./analytics";
import { blogApi } from "./blog";
import { sendContactMessage, type ContactMessage } from "./contact";
import { pingVisitor, submitConsent } from "./landing";

type MutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn"
>;

interface ConsentChoice {
  accepted: boolean;
  email?: string;
}

export const apiQueryKeys = {
  blogPosts: ["public-blog-posts"] as const,
  blogPost: (slug: string) => ["public-blog-post", slug] as const,
  visitorPing: ["landing", "ping"] as const,
};

export function usePublishedBlogPosts(initialData?: BlogPost[]) {
  return useQuery({
    queryKey: apiQueryKeys.blogPosts,
    queryFn: blogApi.listPublished,
    ...(initialData !== undefined
      ? { initialData, initialDataUpdatedAt: 0 }
      : {}),
    staleTime: 60_000,
  });
}

export function usePublishedBlogPost(slug: string, initialData?: BlogPost) {
  return useQuery({
    queryKey: apiQueryKeys.blogPost(slug),
    queryFn: () => blogApi.getPublished(slug),
    ...(initialData !== undefined
      ? { initialData, initialDataUpdatedAt: 0 }
      : {}),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}

export function useVisitorPing(enabled = true) {
  return useQuery({
    queryKey: apiQueryKeys.visitorPing,
    queryFn: pingVisitor,
    enabled,
    retry: false,
    staleTime: 0,
  });
}

export function useSubmitConsent(
  options?: MutationOptions<Awaited<ReturnType<typeof submitConsent>>, ConsentChoice>,
) {
  return useMutation({
    mutationFn: ({ accepted, email }: ConsentChoice) => submitConsent(accepted, email),
    ...options,
  });
}

export function useAnalyticsEvent(
  options?: MutationOptions<void, AnalyticsEvent>,
) {
  return useMutation({ mutationFn: recordAnalyticsEvent, ...options });
}

export function useSendContactMessage(
  options?: MutationOptions<
    Awaited<ReturnType<typeof sendContactMessage>>,
    ContactMessage
  >,
) {
  return useMutation({ mutationFn: sendContactMessage, ...options });
}
