import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  loginPath: string;
  children: JSX.Element;
}

const PrivateRoute = ({ children, loginPath }: PrivateRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  return auth ? children : <Navigate to={loginPath} replace />;
};

export default PrivateRoute;
