import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, Mic2, PenLine } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AdventurePanel, AdventureSectionTitle, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Editorial team | ${SITE_CONFIG.name}`,
    description: 'Meet the editors, producers, and researchers behind our adventure journalism desk.',
    openGraphTitle: `Editorial team | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Field editors, copy chiefs, and photo producers keeping every dispatch accountable.',
  })
}

const desks = [
  { title: 'Field desk', body: 'Assigns routes, safety reviews, and local partner introductions before a reporter travels.', icon: Mic2 },
  { title: 'Copy & standards', body: 'Fact-checking, style consistency, and legal read on sensitive investigations.', icon: PenLine },
  { title: 'Reader experience', body: 'Typography, accessibility, and product design so stories read beautifully everywhere.', icon: Mail },
]

export default function TeamPage() {
  return (
    <PageShell
      variant="adventure"
      title="Editorial team"
      description="A compact crew obsessed with accuracy, humane pacing, and photography that honors the places we visit."
      actions={
        <Button variant="outline" className="rounded-full border-[#1A4D4E]/35 bg-white" asChild>
          <Link href="/contact">Reach the desk</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {desks.map((d) => (
          <AdventureSoftPanel key={d.title}>
            <d.icon className="h-5 w-5 text-[#1A4D4E]" aria-hidden />
            <h2 className="mt-3 text-lg font-semibold text-[#0f1a1a]">{d.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#4a6566]">{d.body}</p>
          </AdventureSoftPanel>
        ))}
      </div>

      <div className="mt-16">
        <AdventureSectionTitle kicker="People" title={`Who you will collaborate with at ${SITE_CONFIG.name}`} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <AdventurePanel key={member.id}>
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <Avatar className="h-20 w-20 border border-[#c5d9d9]/80">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-[#1A4D4E] text-lg text-white">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="mt-4 sm:ml-5 sm:mt-0">
                  <p className="text-lg font-semibold text-[#0f1a1a]">{member.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1A4D4E]">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">{member.bio}</p>
                  <p className="mt-2 text-xs text-[#5a7a7b]">{member.location}</p>
                </div>
              </div>
            </AdventurePanel>
          ))}
        </div>
      </div>

      <AdventurePanel className="mt-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a7a7b]">Open roles</p>
            <p className="mt-2 max-w-xl text-base text-[#4a6566]">
              We are always interested in hearing from investigative reporters, photo editors, and audio producers who understand mountain, river, and polar environments.
            </p>
          </div>
          <Button className="shrink-0 rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]" asChild>
            <Link href="/careers">View careers</Link>
          </Button>
        </div>
      </AdventurePanel>
    </PageShell>
  )
}
