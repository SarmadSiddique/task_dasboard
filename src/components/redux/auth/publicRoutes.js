import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function PublicRoutes() {
    const auth = useAuth()
    return auth ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes