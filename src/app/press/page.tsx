'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { AdventurePanel, AdventureSectionTitle, AdventureSoftPanel } from '@/components/marketing/adventure-marketing'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      variant="adventure"
      title="Press room"
      description="Logos, wordmarks, product screens, and coverage clips for journalists covering adventure media and slow journalism."
    >
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <AdventurePanel>
          <AdventureSectionTitle kicker="Media kit" title="Brand assets & usage guidelines" className="mb-6" />
          <p className="text-sm leading-relaxed text-[#4a6566]">
            Downloads are provided for editorial use. Commercial or ambiguous use requires a quick email to our communications desk—we usually respond within one business day.
          </p>
          <div className="mt-8 space-y-4">
            {mockPressAssets.map((asset) => (
              <div key={asset.id} className="rounded-xl border border-[#c5d9d9]/60 bg-[#f6f9f9]/70 p-4 sm:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[#0f1a1a]">{asset.title}</p>
                    <p className="mt-1 text-sm text-[#4a6566]">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-[#1A4D4E] text-white">{asset.fileType}</Badge>
                    <Button size="sm" variant="outline" className="rounded-full border-[#1A4D4E]/35" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-[#1A4D4E] text-white hover:bg-[#143d3e]"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdventurePanel>

        <div className="space-y-5">
          <AdventureSoftPanel>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5a7a7b]">Press inquiries</p>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6566]">
              For interview requests, speaker bios, or embargoed review copies, email{' '}
              <Link href="/contact" className="font-semibold text-[#1A4D4E] hover:underline">
                communications through our contact form
              </Link>
              .
            </p>
          </AdventureSoftPanel>

          <AdventureSectionTitle kicker="Coverage" title="Selected mentions" />
          <div className="mt-4 space-y-4">
            {mockPressCoverage.map((item) => (
              <AdventurePanel key={item.id} className="transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5a7a7b]">{item.outlet}</p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#0f1a1a]">{item.headline}</p>
                <p className="mt-2 text-xs text-[#5a7a7b]">{item.date}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1A4D4E]">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Reference link on file
                </span>
              </AdventurePanel>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#c5d9d9]/80">
          <DialogHeader>
            <DialogTitle className="text-[#0f1a1a]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-[#c5d9d9]/60 bg-[#f6f9f9]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-[#4a6566]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full border-[#1A4D4E]/35" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#1A4D4E] text-white"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
