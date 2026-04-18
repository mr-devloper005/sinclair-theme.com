'use client'

import { cn } from '@/lib/utils'

export type HeroStripItem = { id: string; title: string; index: number }

export function HeroStoryStrip({ items, activeIndex, onSelect }: { items: HeroStripItem[]; activeIndex: number; onSelect: (index: number) => void }) {
  if (!items.length) return null

  return (
    <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[rgba(8,18,18,0.72)] px-3 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto pb-1 sm:gap-2">
        {items.map((item) => {
          const selected = item.index === activeIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.index)}
              className={cn(
                'min-w-[140px] shrink-0 rounded-lg px-3 py-2 text-left transition-colors sm:min-w-[180px]',
                selected ? 'bg-white/12 ring-1 ring-white/25' : 'hover:bg-white/6',
              )}
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {String(item.index + 1).padStart(2, '0')}
              </span>
              <span className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-white sm:text-sm">{item.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
