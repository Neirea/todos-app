import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useCurrentUser from '../common/hooks/current-user.hook';
import { APP_KEYS } from '../common/consts';
import { LoadingSpinner } from '../common/components/loading-spinner';

const RequireAuth = ({ reverse }: { reverse?: boolean }) => {
  const location = useLocation();
  const { user, isLoading } = useCurrentUser();
  const shouldRender = reverse ? !user : !!user;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (shouldRender) {
    return <Outlet />;
  }
  return <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} state={{ from: location }} replace />;
};

export default RequireAuth;
