'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  actionClass: string
}

export function RegisterForm({ actionClass }: Props) {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Add your name, email, and password to create an account.', variant: 'destructive' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Welcome aboard', description: 'You are signed in and saved on this device.' })
      router.push('/articles')
      router.refresh()
    } catch {
      toast({ title: 'Could not register', description: 'Try again in a moment.', variant: 'destructive' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Display name
        </Label>
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="h-12 rounded-xl border-border bg-background"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Email
        </Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="h-12 rounded-xl border-border bg-background"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Password
        </Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="h-12 rounded-xl border-border bg-background"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full px-6 text-sm font-semibold ${actionClass}`}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">We keep your profile in local storage so you stay signed in on return visits.</p>
    </form>
  )
}
