'use client'

import type { ComponentType } from 'react'
import Link from 'next/link'
import { ChevronDown, LayoutGrid, Plus, FileText, Building2, Tag, Image as ImageIcon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, ComponentType<{ className?: string }>> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function ArticleCreateMenu() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="h-10 gap-1.5 rounded-full bg-[#1A4D4E] px-4 text-white shadow-[0_14px_28px_rgba(26,77,78,0.28)] hover:bg-[#143d3e]"
        >
          <Plus className="h-4 w-4" />
          Create
          <ChevronDown className="h-3 w-3 opacity-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 border-border/80 bg-card/98 backdrop-blur-sm">
        {SITE_CONFIG.tasks
          .filter((task) => task.enabled)
          .map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
