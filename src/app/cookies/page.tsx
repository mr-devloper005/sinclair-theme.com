import { PageShell } from '@/components/shared/page-shell'
import { AdventurePanel, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'

const cookies = [
  {
    title: 'Strictly necessary',
    body: 'Authentication tokens, session security, and load balancing. These cannot be disabled if you want to stay signed in or complete purchases.',
  },
  {
    title: 'Functional',
    body: 'Remember font size preferences, saved reading positions, or newsletter frequency choices when you ask us to store them.',
  },
  {
    title: 'Analytics',
    body: 'Aggregated metrics about which sections are read, scroll depth, and referral sources. We use this information to prioritize investigations and design experiments—not to build individual marketing profiles.',
  },
  {
    title: 'Embedded media',
    body: 'Some stories include maps or video players hosted by partners. Those partners may set their own cookies governed by their policies.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      variant="adventure"
      title="Cookie policy"
      description="Transparent detail about the cookies and local storage keys we use to keep reading smooth, secure, and respectful of your attention."
    >
      <AdventureSoftPanel>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a7b]">Last updated · April 18, 2026</p>
        <p className="mt-4 text-sm leading-relaxed text-[#4a6566]">
          We aim for the smallest footprint possible. You can clear cookies at any time through your browser; doing so may sign you out or reset optional preferences.
        </p>
      </AdventureSoftPanel>

      <div className="mt-10 space-y-5">
        {cookies.map((c) => (
          <AdventurePanel key={c.title}>
            <h3 className="text-lg font-semibold text-[#0f1a1a]">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">{c.body}</p>
          </AdventurePanel>
        ))}
      </div>

      <AdventurePanel className="mt-10">
        <h3 className="text-lg font-semibold text-[#0f1a1a]">Managing preferences</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">
          When we display a consent banner, you can accept or reject non-essential categories. You can revisit choices by clearing cookies or contacting us for a manual reset. Some jurisdictions provide additional rights—see our Privacy Policy for more.
        </p>
      </AdventurePanel>
    </PageShell>
  )
}
