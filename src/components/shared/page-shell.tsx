'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  /** adventure: same mist/teal rhythm as the homepage hero stack */
  variant?: 'default' | 'adventure'
}) {
  const shell =
    variant === 'adventure'
      ? 'min-h-screen bg-[linear-gradient(180deg,#f6f9f9_0%,#fbfdfe_38%,#ffffff_100%)]'
      : 'min-h-screen bg-background'
  const innerMax = variant === 'adventure' ? 'max-w-7xl' : 'max-w-6xl'
  const contentPad = variant === 'adventure' ? 'py-12 sm:py-14 lg:py-16' : 'py-10'

  return (
    <div className={shell}>
      <NavbarShell />
      <main>
        <section className="border-b border-[#c5d9d9]/60 bg-[linear-gradient(180deg,#ffffff_0%,#f4f9f9_100%)]">
          <div className={`mx-auto ${innerMax} px-4 py-10 sm:px-6 lg:px-8`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-9 w-1 shrink-0 rounded-full bg-[#1A4D4E]" aria-hidden />
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-[#0f1a1a] sm:text-4xl">{title}</h1>
                  {description && <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#4a6566]">{description}</p>}
                </div>
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className={`mx-auto ${innerMax} px-4 sm:px-6 lg:px-8 ${contentPad}`}>{children}</section>
      </main>
      <Footer />
    </div>
  )
}
