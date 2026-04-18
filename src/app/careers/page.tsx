import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdventurePanel, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior adventure editor',
    location: 'Remote (US / EU time zones)',
    type: 'Full-time',
    level: 'Senior',
    blurb: 'Own a vertical—climate mobility, alpine safety, or human-powered travel—and mentor writers from pitch to publish.',
  },
  {
    title: 'Photo & video producer',
    location: 'Hybrid · Denver',
    type: 'Full-time',
    level: 'Mid',
    blurb: 'Shape field shoots, color pipelines, and motion packages that match our print-meets-digital art direction.',
  },
  {
    title: 'Audience & partnerships lead',
    location: 'Remote',
    type: 'Full-time',
    level: 'Lead',
    blurb: 'Build ethical sponsor integrations, newsletter growth, and live events without compromising editorial firewall.',
  },
]

const benefits = [
  'Remote-first with quarterly field meetups',
  'Health, dental, vision + mental health stipend',
  'Gear & travel allowance for approved assignments',
  'Sabbatical after four years',
  'Profit share on membership milestones',
]

const values = [
  'Safety and inclusion are prerequisites, not footnotes.',
  'We pay for reporting—not for “exposure.”',
  'Transparent pay bands; no ghosting after interviews.',
]

export default function CareersPage() {
  return (
    <PageShell
      variant="adventure"
      title="Careers"
      description={`Join ${SITE_CONFIG.name} and help build the calmest, most trusted adventure desk on the open web.`}
      actions={
        <Button className="rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]" asChild>
          <Link href="/contact">
            Start a conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <AdventurePanel key={role.title} className="transition hover:shadow-[0_20px_55px_rgba(15,42,44,0.08)]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-md bg-[#1A4D4E] text-white hover:bg-[#143d3e]">{role.level}</Badge>
                <Badge variant="outline" className="rounded-md border-[#c5d9d9] text-[#0f1a1a]">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#0f1a1a]">{role.title}</h2>
              <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-[#5a7a7b]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {role.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Rolling applications
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#4a6566]">{role.blurb}</p>
              <Button variant="outline" className="mt-5 rounded-full border-[#1A4D4E]/35" asChild>
                <Link href="/contact">Request full brief</Link>
              </Button>
            </AdventurePanel>
          ))}
        </div>

        <div className="space-y-6">
          <AdventureSoftPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a7a7b]">Why join</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0f1a1a]">{`Life inside ${SITE_CONFIG.name}`}</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#4a6566]">
              We are a small, senior-heavy team. You will ship visible work, travel on assignment when it makes sense, and collaborate with photographers,
              fact-checkers, and cartographers who care about craft.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#4a6566]">
              {values.map((v) => (
                <li key={v} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A4D4E]" aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
          </AdventureSoftPanel>

          <AdventurePanel>
            <h3 className="text-lg font-semibold text-[#0f1a1a]">Benefits snapshot</h3>
            <ul className="mt-4 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-[#c5d9d9]/40 bg-[#f6f9f9]/80 px-3 py-2.5 text-sm text-[#4a6566]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5a8f91]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </AdventurePanel>
        </div>
      </div>
    </PageShell>
  )
}
