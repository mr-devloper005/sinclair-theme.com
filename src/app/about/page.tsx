import Link from 'next/link'
import { Compass, Mountain, Shield, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AdventurePanel, AdventureSectionTitle, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Field-first reporting',
    body: 'Our editors prioritize on-the-ground verification, clear safety context, and respect for the landscapes and communities we cover.',
    icon: Mountain,
  },
  {
    title: 'Slow journalism, fast scanning',
    body: 'Long reads get room to breathe—while navigation, search, and section rails stay crisp so you can find the right story quickly.',
    icon: Compass,
  },
  {
    title: 'Trust by design',
    body: 'Corrections, bylines, and transparent sourcing matter as much as typography. We build those signals into every template.',
    icon: Shield,
  },
]

const stats = [
  { value: '40+', label: 'countries covered in the archive' },
  { value: '120+', label: 'field contributors & photographers' },
  { value: '18', label: 'months average editorial lead time' },
]

export default function AboutPage() {
  return (
    <PageShell
      variant="adventure"
      title={`About ${SITE_CONFIG.name}`}
      description="We publish independent adventure journalism—trail ethics, climate on the move, gear that survives real mileage, and human stories from the edge of the map."
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[#1A4D4E]/35 bg-white" asChild>
            <Link href="/team">Meet the desk</Link>
          </Button>
          <Button className="rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]" asChild>
            <Link href="/contact">Talk to editors</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <AdventurePanel>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5d9d9]/80 bg-[#eef5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D4E]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Our mandate
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#0f1a1a] sm:text-3xl">Stories for readers who actually go outside.</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#4a6566] sm:text-base">
            {SITE_CONFIG.name} started as a reaction to noisy feeds and thin outdoor listicles. Today we pair rigorous editing with immersive
            art direction—so a river descent, a climate dispatch, or a gear lab review all feel like part of one publication, not scattered posts.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#4a6566] sm:text-base">
            We fund field reporting through memberships and partnerships that never dictate coverage. Editorial independence is non-negotiable—and
            we publish corrections with the same prominence as the original piece.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-[#c5d9d9]/50 bg-[#f6f9f9] px-4 py-4">
                <p className="text-2xl font-semibold text-[#1A4D4E]">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#5a7a7b]">{s.label}</p>
              </div>
            ))}
          </div>
        </AdventurePanel>

        <div className="space-y-5">
          {pillars.map((p) => (
            <AdventureSoftPanel key={p.title}>
              <p.icon className="h-5 w-5 text-[#1A4D4E]" aria-hidden />
              <h3 className="mt-3 text-lg font-semibold text-[#0f1a1a]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a6566]">{p.body}</p>
            </AdventureSoftPanel>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <AdventureSectionTitle kicker="Masthead" title="Editors & producers shaping each issue" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <AdventurePanel key={member.id} className="transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(15,42,44,0.1)]">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border border-[#c5d9d9]/80">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-[#1A4D4E] text-white">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#0f1a1a]">{member.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1A4D4E]">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">{member.bio}</p>
                  <p className="mt-2 text-xs text-[#5a7a7b]">{member.location}</p>
                </div>
              </div>
            </AdventurePanel>
          ))}
        </div>
      </div>

      <AdventureSoftPanel className="mt-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#5a7a7b]">Work with us</p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#4a6566]">
          Pitch a route, investigation, or photo essay. We read every submission and respond with clear next steps—even when the timing is not a fit.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button className="rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]" asChild>
            <Link href="/register">Open contributor account</Link>
          </Button>
          <Button variant="outline" className="rounded-full border-[#1A4D4E]/35" asChild>
            <Link href="/careers">See open roles</Link>
          </Button>
        </div>
      </AdventureSoftPanel>
    </PageShell>
  )
}
