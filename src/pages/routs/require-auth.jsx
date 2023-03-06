import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth');

  const location = useLocation();
  if (!isAuth) {
    return <Navigate to='/auth' state={{ from: location }} />;
  }
  return children;
};
