import React from 'react';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { APP_KEYS } from '../../common/consts';

type Props = {
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class AuthErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    let value = false;
    if (error instanceof AxiosError) {
      value = error.response?.status === 401;
      localStorage.removeItem('token');
    }
    return { hasError: value };
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <Navigate to={APP_KEYS.ROUTER_KEYS.LOGIN} />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
}

export default AuthErrorBoundary;
