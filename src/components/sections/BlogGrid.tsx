import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { BadgeTone } from "@/components/ui/Badge";
import type { BlogPost } from "@/types";

const categoryTone: Record<string, BadgeTone> = {
  Cloud: "brand",
  AI: "coral",
  Design: "teal",
  Engineering: "brand",
  Process: "coral",
  Data: "teal",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
          <Card hoverLift className="flex h-full flex-col">
            <Badge tone={categoryTone[post.category] ?? "neutral"}>
              {post.category}
            </Badge>
            <h3 className="mt-4 font-display text-lg leading-snug text-ink">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Read article
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
