'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { HeroStoryStrip } from '@/components/home/hero-story-strip'

export type AdventureHeroPost = {
  id: string
  slug: string
  title: string
  summary?: string | null
  image: string
  tag?: string
}

function readMinutes(summary?: string | null) {
  const words = (summary || '').split(/\s+/).filter(Boolean).length
  if (!words) return '5 min read'
  const mins = Math.max(3, Math.min(14, Math.ceil(words / 220)))
  return `${mins} min read`
}

export function AdventureHero({ posts }: { posts: AdventureHeroPost[] }) {
  const list = useMemo(() => (posts.length ? posts : []), [posts])
  const [activeIndex, setActiveIndex] = useState(0)

  if (!list.length) {
    return (
      <section className="relative overflow-hidden rounded-[1.25rem] bg-[#0f2324] px-6 py-24 text-center text-white sm:rounded-2xl">
        <p className="text-sm text-white/70">Fresh stories are on the way. Browse the archive for earlier dispatches.</p>
        <Link href="/articles" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1A4D4E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#143d3e]">
          Open articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  const current = list[Math.min(activeIndex, list.length - 1)]!
  const stripItems = list.slice(0, 5).map((p, index) => ({ id: p.id, title: p.title, index }))

  return (
    <section className="relative min-h-[min(78vh,720px)] overflow-hidden rounded-[1.25rem] sm:rounded-2xl">
      <div className="absolute inset-0">
        <ContentImage src={current.image} alt={current.title} fill className="object-cover transition-opacity duration-500" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061213]/95 via-[#061213]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061213]/85 via-transparent to-transparent" />
      </div>

      <div className="relative z-[1] flex min-h-[min(78vh,720px)] flex-col px-5 pb-28 pt-12 sm:px-10 sm:pb-32 sm:pt-16 lg:px-14">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
            <Compass className="h-3.5 w-3.5" aria-hidden />
            Editor&apos;s choice
          </span>
          {current.tag ? (
            <span className="rounded-full border border-white/10 bg-[#1A4D4E]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">{current.tag}</span>
          ) : null}
        </div>

        <h1 className="mt-6 max-w-[min(100%,640px)] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          {current.title}
        </h1>
        {current.summary ? (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{current.summary}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/articles/${current.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1A4D4E] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-[#143d3e]"
          >
            Read story
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <span className="text-sm text-white/65">{readMinutes(current.summary)}</span>
        </div>
      </div>

      <HeroStoryStrip items={stripItems} activeIndex={Math.min(activeIndex, stripItems.length - 1)} onSelect={setActiveIndex} />
    </section>
  )
}
