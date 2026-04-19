'use client'

import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label={user?.name ? `${user.name} account` : 'Account menu'}
          className="flex h-auto items-center gap-1.5 rounded-full border border-border bg-card/80 py-0.5 pl-0.5 pr-2 hover:bg-card sm:gap-2 sm:py-1 sm:pl-1 sm:pr-2"
        >
          <Avatar className="h-7 w-7 border border-border sm:h-8 sm:w-8">
            <AvatarImage src={user?.avatar} alt="" />
            <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[120px] truncate text-xs font-medium text-foreground sm:inline">{user?.name}</span>
          <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 opacity-60 sm:block" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 border-border/80 bg-card/98 backdrop-blur-sm">
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-[#0f1a1a] focus:bg-[#eef5f5]"
          onSelect={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
