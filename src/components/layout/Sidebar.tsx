import { Button } from "@/components/ui/button"
import { authService } from "@/services/authService"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"

export function Sidebar() {
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null)
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const role = await authService.getUserRole()
        const user = await authService.getUser()
        setUserRole(role)
        setUserName(user?.user_metadata?.name || 'Usuario')
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error)
      }
    }
    loadUserData()
  }, [])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Navegación</h2>
          <div className="space-y-1">
            {userRole === 'teacher' && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/clase/nueva')}
              >
                Crear Clase
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/mis-clases')}
            >
              Mis Clases
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Ayuda</h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/como-usar')}
            >
              Cómo Usar
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/preguntas-frecuentes')}
            >
              Preguntas Frecuentes
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{userName}</p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/cambiar-contraseña')}
          >
            Cambiar Contraseña
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={handleLogout}
          >
            Salir
          </Button>
        </div>
      </div>
    </div>
  )
} 