import { PageShell } from '@/components/shared/page-shell'
import { AdventurePanel, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'

const licenses = [
  { name: 'Next.js', description: 'MIT License — App Router, image optimization, and streaming primitives.' },
  { name: 'React', description: 'MIT License — UI rendering and server components ecosystem.' },
  { name: 'Tailwind CSS', description: 'MIT License — utility-first styling system.' },
  { name: 'Lucide', description: 'ISC License — iconography used across navigation and editorial modules.' },
  { name: 'Radix UI', description: 'MIT License — accessible primitives for dialogs, menus, and forms.' },
  { name: 'Zod', description: 'MIT License — schema validation for configuration surfaces.' },
  { name: 'TypeScript', description: 'Apache License 2.0 — static typing for application code.' },
  { name: 'Vercel / Turbopack', description: 'Apache License 2.0 — build tooling and deployment pipeline components.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      variant="adventure"
      title="Licenses & acknowledgements"
      description="Open-source components and fonts that power this reading experience. We are grateful to the maintainers who make independent publishing possible."
    >
      <AdventureSoftPanel>
        <p className="text-sm leading-relaxed text-[#4a6566]">
          This page lists major dependencies surfaced in the public bundle. Full transitive notices ship with the application source repository supplied to enterprise partners. If you notice a missing attribution, please flag it through the contact form—we correct quickly.
        </p>
      </AdventureSoftPanel>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {licenses.map((license) => (
          <AdventurePanel key={license.name}>
            <h3 className="text-base font-semibold text-[#0f1a1a]">{license.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4a6566]">{license.description}</p>
          </AdventurePanel>
        ))}
      </div>
    </PageShell>
  )
}
