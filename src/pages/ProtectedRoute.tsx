import { useEffect, useState } from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router'
import { authService } from '@/services/authService.ts'

const publicRoutes = ['/login', '/sign-up', '/confirm-signup', '/verify-token', '/forgot-password', '/update-password']

export default function ProtectedRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth () {
      try {
        const session = await authService.getSession()
        const isPublicRoute = publicRoutes.includes(location.pathname)
        
        if (!session && !isPublicRoute) {
          navigate('/login')
        } else if (session && isPublicRoute) {
          navigate('/')
        }
      } catch {
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate, location.pathname])

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <Outlet />
} 