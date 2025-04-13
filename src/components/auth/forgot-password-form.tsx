import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useState } from 'react'
import { useResetPassword } from '@/hooks/useResetPassword'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const { mutate, isPending, error } = useResetPassword()

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    mutate(email, {
      onSuccess: () => setSuccess(true)
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Revisa tu correo</CardTitle>
            <CardDescription>Instrucciones para restablecer la contraseña enviadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Si te registraste usando tu correo electrónico y contraseña, recibirás un correo para restablecer tu contraseña.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Restablecer Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error.message}</p>}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Enviando...' : 'Enviar correo de restablecimiento'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" className="underline underline-offset-4">
                  Iniciar sesión
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
