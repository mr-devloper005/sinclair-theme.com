import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, BookOpen } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdventurePanel, AdventureSectionTitle, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts, buildPostUrl } from '@/lib/task-data'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/blog',
    title: `Field notes & desk blog | ${SITE_CONFIG.name}`,
    description: 'Behind-the-scenes essays on reporting craft, safety culture, and how we ship each issue.',
    openGraphTitle: `Field notes | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Essays from editors, producers, and guest columnists on the making of adventure journalism.',
  })
}

const topics = [
  { label: 'Dispatch craft', body: 'How we structure field notes, risk assessments, and reader context without slowing the story.' },
  { label: 'Photo ethics', body: 'Consent, anonymity, and environmental responsibility when shooting in sensitive habitats.' },
  { label: 'Gear lab', body: 'What we test, how we disclose partnerships, and when we refuse a review altogether.' },
]

export default async function BlogPage() {
  const posts = await fetchTaskPosts('comment', 12)

  return (
    <PageShell
      variant="adventure"
      title="Field notes"
      description="Longer desk essays, production diaries, and guest columns—everything that does not fit a headline but still belongs in the archive."
      actions={
        <Button className="rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]" asChild>
          <Link href="/articles">
            Read reported stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <AdventureSectionTitle kicker="Latest" title="From the editor’s notebook" />
          <div className="mt-8 space-y-4">
            {posts.length ? (
              posts.map((post) => (
                <AdventurePanel key={post.id} className="transition hover:shadow-[0_18px_48px_rgba(15,42,44,0.08)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-[#c5d9d9] text-[#0f1a1a]">
                      Field note
                    </Badge>
                    {post.publishedAt ? (
                      <span className="text-xs text-[#5a7a7b]">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    ) : null}
                  </div>
                  <Link href={buildPostUrl('comment', post.slug)} className="mt-3 block text-lg font-semibold text-[#0f1a1a] hover:text-[#1A4D4E]">
                    {post.title}
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#4a6566]">{post.summary || 'Notes from production, ethics, and reader mail.'}</p>
                  <Link
                    href={buildPostUrl('comment', post.slug)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1A4D4E] hover:underline"
                  >
                    Continue reading
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </AdventurePanel>
              ))
            ) : (
              <AdventureSoftPanel>
                <p className="text-sm text-[#4a6566]">New desk essays will appear here as soon as they are published. Browse reported features in the meantime.</p>
                <Button className="mt-4 rounded-full bg-[#1A4D4E] text-white" asChild>
                  <Link href="/articles">Open articles</Link>
                </Button>
              </AdventureSoftPanel>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <AdventureSoftPanel>
            <div className="flex items-center gap-2 text-[#1A4D4E]">
              <BookOpen className="h-5 w-5" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">What we publish here</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">
              {SITE_CONFIG.name} separates reported features from meta-writing. This blog hosts methodology, reader mail responses, and transparent updates about
              corrections or investigations in progress.
            </p>
          </AdventureSoftPanel>
          {topics.map((t) => (
            <AdventurePanel key={t.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A4D4E]">{t.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#4a6566]">{t.body}</p>
            </AdventurePanel>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
