import { PageShell } from '@/components/shared/page-shell'
import { AdventurePanel } from '@/components/marketing/adventure-marketing'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Agreement',
    body: `By accessing ${SITE_CONFIG.name} you agree to these terms and to any additional guidelines we post for specific programs (for example, contributor agreements or photo contests). If you disagree, please stop using the site.`,
  },
  {
    title: 'Accounts & security',
    body: 'You are responsible for safeguarding login credentials and for activity under your account. Notify us immediately if you suspect unauthorized access. We may suspend accounts that compromise reader safety or editorial integrity.',
  },
  {
    title: 'Content & licensing',
    body: 'Unless otherwise noted, editorial text, photography, data visualizations, and page design are protected by copyright and may not be reproduced without permission. Limited quoting for criticism or news reporting may be permitted under fair use or similar doctrines—when in doubt, email the desk.',
  },
  {
    title: 'Contributor obligations',
    body: 'Writers, photographers, and illustrators must disclose conflicts of interest, confirm accuracy to the best of their knowledge, and follow safety protocols outlined in assignment letters. Failure to meet these obligations may void payment or publication.',
  },
  {
    title: 'Acceptable use',
    body: 'Do not harass staff, sources, or other readers; do not attempt to scrape the entire archive in bulk without permission; do not upload malware; do not impersonate another person or organization.',
  },
  {
    title: 'Subscriptions & payments',
    body: 'Memberships renew according to the plan you select. Refunds follow the policy displayed at checkout. Taxes may apply based on your billing address.',
  },
  {
    title: 'Disclaimers',
    body: 'Outdoor activities carry inherent risk. Our reporting is for informational purposes and does not replace professional guides, medical advice, or government advisories. Conditions in the field change quickly—verify locally before you travel.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the site. Some jurisdictions do not allow certain limitations; in those cases our liability is capped at the amount you paid us in the twelve months before the claim.',
  },
  {
    title: 'Governing law & disputes',
    body: 'These terms are governed by the laws specified in your membership agreement or, if none is specified, by the laws of the jurisdiction where the publishing entity is organized. Disputes should first be escalated through our contact form.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms to reflect new features or legal requirements. Material changes will be posted here with an updated effective date and, when appropriate, emailed to active accounts.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      variant="adventure"
      title="Terms of service"
      description={`The rules that keep ${SITE_CONFIG.name} fair for readers, members, and contributors.`}
    >
      <AdventurePanel>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a7b]">Effective date</p>
        <p className="mt-1 text-sm text-[#0f1a1a]">April 18, 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-[#4a6566]">
          These terms work together with our Privacy Policy and Cookie Policy. If anything here conflicts with a written contract you signed with us directly, the contract controls.
        </p>
      </AdventurePanel>

      <div className="mt-10 space-y-5">
        {sections.map((section) => (
          <AdventurePanel key={section.title}>
            <h3 className="text-lg font-semibold text-[#0f1a1a]">{section.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">{section.body}</p>
          </AdventurePanel>
        ))}
      </div>
    </PageShell>
  )
}
