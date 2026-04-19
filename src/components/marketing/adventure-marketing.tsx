import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AdventureSectionTitle({ kicker, title, className }: { kicker: string; title: string; className?: string }) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-[#1A4D4E]" aria-hidden />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#5a7a7b]">{kicker}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#0f1a1a] sm:text-3xl">{title}</h2>
      </div>
    </div>
  )
}

export function AdventurePanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-[#c5d9d9]/70 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,42,44,0.06)] sm:p-8', className)}>
      {children}
    </div>
  )
}

export function AdventureSoftPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-[#c5d9d9]/60 bg-[#eef5f5]/90 p-6 sm:p-7', className)}>{children}</div>
}
