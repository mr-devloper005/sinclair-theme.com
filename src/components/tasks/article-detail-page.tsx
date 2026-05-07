"use client";

import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail, Clock, ArrowRight, Bookmark } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { cn } from "@/lib/utils";
import { ArticleComments } from "@/components/tasks/article-comments";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getFactoryState } from "@/design/factory/get-factory-state";
import { getProductKind } from "@/design/factory/get-product-kind";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const absoluteUrl = (value?: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!value.startsWith("/")) return null;
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${value}`;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

export function ArticleDetailPage() {
  const [post, setPost] = useState<SitePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const taskConfig = getTaskConfig("article");
        const fetchedPost = await fetchTaskPostBySlug("article", slug);
        
        if (!fetchedPost) {
          notFound();
          return;
        }
        
        setPost(fetchedPost);
      } catch (err) {
        console.warn("Failed to load post detail", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <NavbarShell />
        <main className="relative">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <NavbarShell />
        <main className="relative">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">Error: {error || "Article not found"}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const taskConfig = getTaskConfig("article");
  const content = getContent(post);
  const category = content.category || post.tags?.[0] || taskConfig?.label || "article";
  const description = content.description || post.summary || "Details coming soon.";
  const articleHtml = formatArticleHtml(content, post);
  const articleSummary = post.summary || content.excerpt || "";
  const articleAuthor = content.author || post.authorName || "Anonymous";
  const postTags = Array.isArray(post.tags) ? post.tags : [];
  const images = getImageUrls(post, content);
  const articleUrl = absoluteUrl(buildPostUrl("article", slug)) || "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: articleSummary,
    author: {
      "@type": "Person",
      name: articleAuthor,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: images[0] ? absoluteUrl(images[0]) : undefined,
    url: absoluteUrl(buildPostUrl("article", post.slug)),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Articles",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/posts"}/${post.slug}`,
      },
    ],
  };

  const schemaPayload = [articleSchema, breadcrumbSchema];
  const { recipe } = getFactoryState();
  const productKind = getProductKind(recipe);

  return (
    <ArticleDetailWrapper 
      post={post}
      articleUrl={articleUrl}
      articleSummary={articleSummary}
      articleHtml={articleHtml}
      articleAuthor={articleAuthor}
      category={category}
      postTags={postTags}
      images={images}
      schemaPayload={schemaPayload}
      slug={slug}
    />
  );
}

function ArticleDetailWrapper({ 
  post, 
  articleUrl, 
  articleSummary, 
  articleHtml, 
  articleAuthor, 
  category, 
  postTags, 
  images, 
  schemaPayload, 
  slug 
}: {
  post: SitePost;
  articleUrl: string;
  articleSummary: string;
  articleHtml: string;
  articleAuthor: string;
  category: string;
  postTags: string[];
  images: string[];
  schemaPayload: any[];
  slug: string;
}) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <NavbarShell />
      <main className="relative">
        {/* Hero Section with Featured Image */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          {images[0] && (
            <ContentImage
              src={images[0]}
              alt={`${post.title} featured image`}
              fill
              className="object-cover"
              intrinsicWidth={1600}
              intrinsicHeight={900}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Floating Title Card */}
          <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-[600px]">
            <div className="backdrop-blur-md bg-white/90 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900 mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge className="bg-slate-900 text-white px-3 py-1">
                  {category}
                </Badge>
                <span className="text-slate-600">By {articleAuthor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content Section */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <SchemaJsonLd data={schemaPayload} />
          
          {/* Meta Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              {postTags.length > 0 && postTags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-slate-900"
                asChild
              >
                <Link href="/login">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Link>
              </Button>
            </div>
          </div>

          
          {/* Main Article Content */}
          <div className="prose prose-lg prose-slate max-w-none">
            <RichContent 
              html={articleHtml} 
              className="leading-8 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6 prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900" 
            />
          </div>

          {/* Additional Images Gallery */}
          {images.length > 1 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                    <ContentImage
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      intrinsicWidth={800}
                      intrinsicHeight={600}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-16">
            <ArticleComments slug={slug} />
          </div>
        </div>

        {/* Floating Back Button */}
        <div className="fixed bottom-8 left-8 z-50">
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg">
            <Link href="/articles" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Articles
            </Link>
          </Button>
        </div>

              </main>
      <Footer />
    </div>
  );
}
