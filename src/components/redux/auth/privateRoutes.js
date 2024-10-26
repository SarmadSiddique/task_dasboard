import { Outlet, Navigate } from 'react-router-dom'
import {useAuth} from './useAuth'

function PrivateRoutes() {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes