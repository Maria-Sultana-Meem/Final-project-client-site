import { Navigate, useLocation } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../shared/LoadingSpinner'



const ManagerRoute = ({ children }) => {
  const location = useLocation()
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'manager') return children
  
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default ManagerRoute
