import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router'

export default function Confirm() {
  const navigate = useNavigate()

  return (
    <section className="flex w-full h-full items-center justify-center p-6 md:p-10 preview bg-surface-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">¡Correo enviado!</CardTitle>
            <CardDescription>Revisa tu bandeja de entrada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <p className="text-sm text-muted-foreground">
                Te hemos enviado un correo electrónico con un enlace para confirmar tu cuenta.
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full"
                >
                  Volver al inicio de sesión
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Reenviar correo de confirmación
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 