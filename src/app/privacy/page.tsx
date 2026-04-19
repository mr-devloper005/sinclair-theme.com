import { PageShell } from '@/components/shared/page-shell'
import { AdventurePanel } from '@/components/marketing/adventure-marketing'

const sections = [
  {
    title: 'Who we are',
    body: 'This policy describes how the publication operating this site (“we”, “us”) collects, uses, and shares information when you read stories, create an account, subscribe, or contact our editors.',
  },
  {
    title: 'Information we collect',
    body: 'Account details you provide (name, email), reading preferences you save locally in your browser, communications you send through forms, and limited technical data such as device type and approximate region to keep the site secure and fast.',
  },
  {
    title: 'How we use information',
    body: 'We use data to deliver articles, authenticate members, respond to editorial inquiries, prevent abuse, measure aggregate readership, and improve typography and accessibility. We do not sell personal data to data brokers.',
  },
  {
    title: 'Newsletters & marketing',
    body: 'If you opt in, we send editorial newsletters and occasional product updates. Every email includes a one-click unsubscribe link. Promotional partnerships are labeled clearly inside the message body.',
  },
  {
    title: 'Cookies & similar technologies',
    body: 'We use essential cookies for sign-in and optional analytics cookies to understand which sections readers find useful. You can control non-essential cookies through your browser or our cookie banner when shown.',
  },
  {
    title: 'Data retention',
    body: 'We keep account information while your profile is active. Editorial correspondence may be retained longer for legal or integrity reasons, such as investigating harassment or verifying a correction.',
  },
  {
    title: 'Your rights',
    body: 'Depending on where you live, you may request access, correction, export, or deletion of personal data. We respond within the timelines required by applicable law and explain any limitations (for example, when retention is required for fraud prevention).',
  },
  {
    title: 'International readers',
    body: 'We may process information in countries where our hosting providers operate. When data moves across borders we rely on recognized safeguards such as standard contractual clauses.',
  },
  {
    title: 'Children',
    body: 'This site is not directed at children under 16, and we do not knowingly collect data from them. Contact us if you believe a minor has provided personal information.',
  },
  {
    title: 'Updates',
    body: 'When we materially change this policy we revise the “Last updated” date below and, when appropriate, notify active members by email.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      variant="adventure"
      title="Privacy policy"
      description="How we collect, use, and protect information when you read, contribute, or correspond with our adventure journalism desk."
    >
      <AdventurePanel>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a7a7b]">Last updated</p>
        <p className="mt-1 text-sm text-[#0f1a1a]">April 18, 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-[#4a6566]">
          We wrote this policy in plain language so you can skim it between field assignments. It is designed to pair with our Terms of Service and Cookie Policy without surprises.
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
