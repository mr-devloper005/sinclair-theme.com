"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/local-storage";
import type { User } from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_MASTER_PANEL_URL ||
  process.env.NEXT_PUBLIC_MASTER_API_URL;
const SITE_CODE = process.env.NEXT_PUBLIC_SITE_CODE;
const LOCAL_COMMENT_VERSION = "v2";
const DAILY_COMMENT_LIMIT = 10;

type LocalComment = {
  id: string;
  slug: string;
  articleSlug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local";
};

type DisplayComment = {
  id: string;
  slug: string;
  authorName: string;
  body: string;
  createdAt: string;
  source: "local" | "remote";
};

const buildPublicUrl = (path: string) => {
  if (!API_BASE || !SITE_CODE) return null;
  return `${API_BASE.replace(/\/$/, "")}/api/v1/public/${SITE_CODE}${path}`;
};

const getContent = (post: SitePost) =>
  post.content && typeof post.content === "object" ? (post.content as Record<string, any>) : {};

const commentStorageKey = (slug: string) => `nexus-article-comments:${LOCAL_COMMENT_VERSION}:${slug}`;

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const nextResetTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLocalAuthorName = () => {
  const savedUser = loadFromStorage<User | null>(storageKeys.user, null);
  return savedUser?.name?.trim() || "User";
};

const toDisplayComment = (comment: SitePost): DisplayComment => {
  const content = getContent(comment);
  return {
    id: comment.id,
    slug: comment.slug,
    authorName: comment.authorName || "Anonymous",
    body:
      (typeof content.description === "string" && content.description) ||
      comment.summary ||
      "Comment added.",
    createdAt: comment.publishedAt || comment.createdAt || new Date().toISOString(),
    source: "remote",
  };
};

const sortComments = (comments: DisplayComment[]) =>
  [...comments].sort((a, b) => {
    if (a.source !== b.source) {
      return a.source === "local" ? -1 : 1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

export function ArticleComments({ slug }: { slug: string }) {
  const [remoteComments, setRemoteComments] = useState<DisplayComment[]>([]);
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [page, setPage] = useState(1);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const saved = loadFromStorage<LocalComment[]>(commentStorageKey(slug), []);
    setLocalComments(Array.isArray(saved) ? saved : []);
  }, [slug]);

  useEffect(() => {
    const load = async () => {
      const target = buildPublicUrl("/feed?limit=200");
      if (!target) {
        setRemoteComments([]);
        return;
      }

      try {
        const response = await fetch(target, { cache: "no-store" });
        if (!response.ok) {
          setRemoteComments([]);
          return;
        }
        const json = (await response.json()) as { data?: { posts?: SitePost[] } };
        const posts = json.data?.posts || [];
        const filtered = posts.filter((post) => {
          const content = getContent(post);
          return (
            content.type === "comment" &&
            (content.articleSlug === slug ||
              (typeof content.parentUrl === "string" && content.parentUrl.includes(`/${slug}`)))
          );
        });

        setRemoteComments(filtered.map(toDisplayComment));
      } catch {
        setRemoteComments([]);
      }
    };

    load();
  }, [slug]);

  const mergedComments = useMemo(
    () =>
      sortComments([
        ...localComments.map((comment) => ({
          id: comment.id,
          slug: comment.slug,
          authorName: comment.authorName,
          body: comment.body,
          createdAt: comment.createdAt,
          source: "local" as const,
        })),
        ...remoteComments,
      ]),
    [localComments, remoteComments]
  );

  const commentsToday = useMemo(() => {
    const todayStart = startOfToday();
    return localComments.filter((comment) => new Date(comment.createdAt).getTime() >= todayStart).length;
  }, [localComments]);

  const remainingToday = Math.max(DAILY_COMMENT_LIMIT - commentsToday, 0);
  const limitReached = remainingToday <= 0;
  const resetLabel = nextResetTime().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#comment-")) {
      const targetKey = hash.replace("#comment-", "");
      const match = mergedComments.find(
        (item) => item.id === targetKey || item.slug === targetKey
      );
      setHighlightId(match?.id || null);
      return;
    }

    if (hash === "#comment" && mergedComments.length) {
      setHighlightId(mergedComments[0].id);
      return;
    }

    setHighlightId(null);
  }, [mergedComments]);

  useEffect(() => {
    if (!highlightId) return;
    const target = document.getElementById(`comment-${highlightId}`);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [highlightId]);

  const totalPages = Math.max(Math.ceil(mergedComments.length / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const visibleComments = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return mergedComments.slice(start, start + pageSize);
  }, [mergedComments, safePage]);

  const persistLocalComments = (nextComments: LocalComment[]) => {
    setLocalComments(nextComments);
    saveToStorage(commentStorageKey(slug), nextComments);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBody = commentBody.trim();

    if (!cleanBody) {
      setFormError("Please write a comment before publishing.");
      return;
    }

    if (limitReached) {
      setFormError("You have reached the 10 comments per day limit on this device.");
      return;
    }

    const nextComment: LocalComment = {
      id: `local-${slug}-${Date.now()}`,
      slug: `local-comment-${Date.now()}`,
      articleSlug: slug,
      authorName: getLocalAuthorName(),
      body: cleanBody,
      createdAt: new Date().toISOString(),
      source: "local",
    };

    persistLocalComments([nextComment, ...localComments]);
    setCommentBody("");
    setFormError(null);
    setHighlightId(nextComment.id);
    setPage(1);
  };

  const handleDeleteLocalComment = (commentId: string) => {
    const nextComments = localComments.filter((comment) => comment.id !== commentId);
    persistLocalComments(nextComments);
    if (highlightId === commentId) {
      setHighlightId(null);
    }
    setFormError(null);
  };

  return (
    <section className="mt-16 relative" id="comments">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f3eff8] via-[#efeaf6] to-[#e9e6f1] opacity-80"></div>
      <div className="absolute top-4 right-4 h-32 w-32 rounded-full bg-gradient-to-br from-[#d9d2e6] to-[#cec5df] opacity-25 blur-3xl"></div>
      <div className="absolute bottom-4 left-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#dad5e8] to-[#cbc2dc] opacity-30 blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#ddd5e8] bg-[#f5f1fa]/90 px-6 py-3 shadow-lg backdrop-blur-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">
              Discussion ({mergedComments.length})
            </span>
          </div>
          <p className="text-slate-600 text-sm">Join the conversation and share your thoughts</p>
        </div>

        {/* Comment Form */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#c8bddc]/25 via-[#cbbfe0]/25 to-[#bfb2d5]/25 blur-xl"></div>
            <form onSubmit={handleSubmit} className="relative rounded-3xl border border-[#d8d0e4] bg-[#f0edf5]/95 p-8 shadow-2xl backdrop-blur-md">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-[#d2c9de] pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                    <span className="text-white font-bold text-lg">
                      {getLocalAuthorName().charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{getLocalAuthorName()}</h3>
                    <p className="text-sm text-slate-500">Share your thoughts</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="comment-body" className="block text-sm font-semibold text-slate-900">
                    Your Comment
                  </label>
                  <Textarea
                    id="comment-body"
                    value={commentBody}
                    onChange={(event) => setCommentBody(event.target.value)}
                    placeholder="What's on your mind? Share your perspective..."
                    className="min-h-32 resize-none rounded-2xl border-[#d7cede] bg-[#f7f4fb] text-slate-700 placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    maxLength={2000}
                    disabled={limitReached}
                  />
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        limitReached
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : remainingToday <= 3
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        limitReached ? "bg-red-500" : remainingToday <= 3 ? "bg-amber-500" : "bg-green-500"
                      }`}></div>
                      {limitReached
                        ? `Daily limit reached: ${DAILY_COMMENT_LIMIT}/${DAILY_COMMENT_LIMIT}`
                        : `${remainingToday} of ${DAILY_COMMENT_LIMIT} comments left today`}
                    </div>
                    <p className="text-xs text-slate-500">
                      {limitReached
                        ? `You can publish again after ${resetLabel}.`
                        : `Limit resets after ${resetLabel}.`}
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={limitReached}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {limitReached ? "Limit Reached" : "Publish Comment"}
                  </Button>
                </div>
                {formError ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <p className="text-sm text-red-700">{formError}</p>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        {mergedComments.length ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-purple-700">
                  {mergedComments.length} {mergedComments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              </div>
            </div>
            
            {visibleComments.map((comment, index) => {
              const isHighlighted = highlightId === comment.id;
              return (
                <div
                  key={comment.id}
                  id={`comment-${comment.id}`}
                  className={`relative group transition-all duration-300 ${
                    isHighlighted 
                      ? "scale-105 z-20" 
                      : "hover:scale-[1.02] z-10"
                  }`}
                >
                  {/* Highlight Glow */}
                  {isHighlighted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl -z-10"></div>
                  )}
                  
                  <div className={`relative bg-white/90 backdrop-blur-md rounded-3xl border shadow-lg overflow-hidden ${
                    isHighlighted 
                      ? "border-purple-300 shadow-purple-200/50" 
                      : "border-white/20 hover:border-purple-200/50"
                  }`}>
                    {/* Comment Header */}
                    <div className={`p-6 border-b ${
                      isHighlighted 
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200" 
                        : "bg-gradient-to-r from-slate-50 to-white border-slate-100"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                            comment.source === "local" 
                              ? "bg-gradient-to-br from-purple-400 to-pink-400" 
                              : "bg-gradient-to-br from-blue-400 to-purple-400"
                          }`}>
                            {comment.authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{comment.authorName}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">
                                {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                              {comment.source === "local" && (
                                <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {comment.source === "local" && (
                          <button
                            type="button"
                            onClick={() => handleDeleteLocalComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                            aria-label="Delete local comment"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Comment Body */}
                    <div className="p-6">
                      <RichContent
                        html={formatRichHtml(comment.body, "Comment added.")}
                        className="text-slate-700 prose-sm prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed"
                      />
                    </div>
                    
                    {/* Comment Actions */}
                    <div className="px-6 pb-4">
                      <div className="flex items-center gap-4">
                        <button className="text-xs text-slate-500 hover:text-purple-600 transition-colors">
                          Reply
                        </button>
                        <button className="text-xs text-slate-500 hover:text-purple-600 transition-colors">
                          Like
                        </button>
                        <span className="text-xs text-slate-400">
                          Comment #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl opacity-50"></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No comments yet</h3>
              <p className="text-slate-600 text-sm">Be the first to share your thoughts on this article!</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 ? (
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-slate-600 font-medium">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={safePage === 1}
                  className="px-6 py-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={safePage === totalPages}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
