import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      soft: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[linear-gradient(180deg,#f6f9f9_0%,#fbfdfe_45%,#ffffff_100%)] text-[#0f1a1a]',
      panel: 'border border-[#c5d9d9]/80 bg-white shadow-[0_18px_50px_rgba(15,42,44,0.06)]',
      soft: 'border border-[#c5d9d9]/70 bg-[#eef5f5]',
      muted: 'text-[#4a6566]',
      action: 'bg-[#1A4D4E] text-white hover:bg-[#143d3e]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Pitches & investigations', body: 'Route-level reporting, climate mobility, and human-centered adventure features—send a one-page outline plus timeline.' },
            { icon: Mail, title: 'Partnerships & syndication', body: 'Ethical sponsor integrations, nonprofit collaborations, and reprint requests with transparent disclosure language.' },
            { icon: Sparkles, title: 'Reader & member support', body: 'Account access, gift memberships, and accessibility feedback routed to the right producer within 48 hours.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-[#1A4D4E]" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a7a7b]">Contact {SITE_CONFIG.name}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#0f1a1a] sm:text-5xl">Route your note to the right desk—fast.</h1>
                <p className={`mt-5 max-w-2xl text-base leading-relaxed ${tone.muted}`}>
                  Whether you are filing a correction, pitching a river corridor investigation, or coordinating a classroom partnership, tell us which lane fits. We read
                  everything and respond with a human name, not a ticket hash.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-2xl p-6 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#1A4D4E]" />
                  <h2 className="mt-3 text-lg font-semibold text-[#0f1a1a]">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-8 ${tone.panel}`}>
            <h2 className="text-xl font-semibold text-[#0f1a1a]">Send a message</h2>
            <p className={`mt-2 text-sm ${tone.muted}`}>This form is monitored by real editors—no automated triage trees.</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-[#c5d9d9]/80 bg-[#fbfdfe] px-4 text-sm text-[#0f1a1a]" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-[#c5d9d9]/80 bg-[#fbfdfe] px-4 text-sm text-[#0f1a1a]" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-[#c5d9d9]/80 bg-[#fbfdfe] px-4 text-sm text-[#0f1a1a]" placeholder="Topic (pitch, correction, partnership…)" />
              <textarea
                className="min-h-[180px] rounded-xl border border-[#c5d9d9]/80 bg-[#fbfdfe] px-4 py-3 text-sm text-[#0f1a1a]"
                placeholder="Share context, deadlines, and links. If this is sensitive, say so—we can switch to encrypted email."
              />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
