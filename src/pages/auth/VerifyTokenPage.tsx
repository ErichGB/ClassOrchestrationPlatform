import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { authService } from '@/services/authService.ts'

export default function VerifyTokenPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      const type = searchParams.get('type')
      const expiresAt = searchParams.get('expires_at')
      const expiresIn = searchParams.get('expires_in')
      const tokenType = searchParams.get('token_type')

      if (!accessToken || !refreshToken || !type || !expiresAt || !expiresIn || !tokenType) {
        setError('Faltan parámetros necesarios para la verificación')
        setIsLoading(false)
        return
      }

      try {
        // Guardamos los tokens en el localStorage
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('expires_at', expiresAt)
        localStorage.setItem('expires_in', expiresIn)
        localStorage.setItem('token_type', tokenType)

        // Redirigimos según el tipo de operación
        switch (type) {
          case 'recovery':
            navigate('/update-password')
            break
          case 'signup': {
            // Si es un registro, verificamos el email
            const user = await authService.getUser()
            if (user?.email_confirmed_at) {
              navigate('/login')
            } else {
              navigate('/confirm-signup')
            }
            break
          }
          default:
            navigate('/login')
        }
      } catch {
        setError('Error al verificar el token')
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [searchParams, navigate])

  return (
    <section className="flex w-full h-full items-center justify-center p-6 md:p-10 preview bg-surface-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Verificando acceso</CardTitle>
            <CardDescription>Por favor espera mientras verificamos tu acceso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <>
                  <p className="text-sm text-red-500">{error}</p>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="w-full"
                  >
                    Volver al inicio de sesión
                  </Button>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 