import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { AdventurePanel, AdventureSoftPanel } from "@/components/marketing/adventure-marketing";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      variant="adventure"
      title="Search the archive"
      description={
        query
          ? `Showing matches for “${query}” across headlines, excerpts, and tags.`
          : "Start with a keyword, author surname, or place name—we search the full text we have permission to index."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7a7b]" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Try “glacier”, “packraft”, or a contributor name…"
              className="h-11 border-[#c5d9d9]/80 bg-white pl-9"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full bg-[#1A4D4E] px-6 text-white hover:bg-[#143d3e]">
            Search
          </Button>
        </form>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post);
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
                return <TaskPostCard key={post.id} post={post} href={href} taskKey={taskKey || undefined} />;
              })}
            </div>
          ) : (
            <AdventureSoftPanel className="text-center">
              <p className="text-base font-medium text-[#0f1a1a]">No matches yet.</p>
              <p className="mt-2 text-sm text-[#4a6566]">
                Widen your terms, check spelling, or browse the latest reporting on the articles page.
              </p>
              <Button className="mt-6 rounded-full bg-[#1A4D4E] text-white" asChild>
                <Link href="/articles">Open articles</Link>
              </Button>
            </AdventureSoftPanel>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <AdventurePanel>
            <div className="flex items-center gap-2 text-[#1A4D4E]">
              <Sparkles className="h-4 w-4" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Search tips</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4a6566]">
              <li>Use quotes for exact phrases, e.g. &quot;ice road&quot;.</li>
              <li>Combine a place + activity: Patagonia packraft.</li>
              <li>Filter by category from the articles index when you need a narrower slice.</li>
            </ul>
          </AdventurePanel>
          <AdventureSoftPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a7b]">Need human help?</p>
            <p className="mt-2 text-sm text-[#4a6566]">Researchers and librarians on staff can dig through paywalled partners or offline assignments.</p>
            <Button variant="outline" className="mt-4 w-full rounded-full border-[#1A4D4E]/35" asChild>
              <Link href="/contact">Contact the desk</Link>
            </Button>
          </AdventureSoftPanel>
        </aside>
      </div>
    </PageShell>
  );
}
