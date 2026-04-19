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

export function LoginForm({ actionClass }: Props) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Enter your email and password to continue.', variant: 'destructive' })
      return
    }
    try {
      await login(email.trim(), password)
      toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
      router.push('/articles')
      router.refresh()
    } catch {
      toast({ title: 'Sign-in failed', description: 'Check your credentials and try again.', variant: 'destructive' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Email
        </Label>
        <Input
          id="login-email"
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
        <Label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Password
        </Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="h-12 rounded-xl border-border bg-background"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full px-6 text-sm font-semibold ${actionClass}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">Your account stays saved on this device after a successful sign-in.</p>
    </form>
  )
}
