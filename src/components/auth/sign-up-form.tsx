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
import { useSignUp } from '@/hooks/useSignUp'

type UserRole = 'student' | 'teacher'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('student')
  const { mutate, isPending, error } = useSignUp()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      return
    }

    if (password.length < 6) {
      return
    }

    mutate({
      email,
      password,
      name: email.split('@')[0], // Usamos el nombre de usuario del email como nombre por defecto
      role: selectedRole
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registro</CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                selectedRole === 'student'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setSelectedRole('student')}
            >
              Estudiante
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                selectedRole === 'teacher'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground'
              }`}
              onClick={() => setSelectedRole('teacher')}
            >
              Profesor
            </button>
          </div>
          <form onSubmit={handleSignUp}>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repetir Contraseña</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error.message}</p>}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Creando cuenta...' : 'Registrarse'}
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
    </div>
  )
}
