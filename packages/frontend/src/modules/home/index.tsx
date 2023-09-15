import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Main } from '../common/components/main';
import * as Styled from './home.styled';
import { APP_KEYS } from '../common/consts';
import { LoadingSpinner } from '../common/components/loading-spinner';
import useCurrentUser from '../common/hooks/current-user.hook';
import ForgotPassword from '../auth/forgot-password';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useCurrentUser();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return <Navigate to={APP_KEYS.ROUTER_KEYS.TODOS} state={{ from: location }} replace />;
  }

  return (
    <Main>
      <Typography variant="h2">Todo App</Typography>
      <Styled.ButtonContainer>
        <Styled.Button variant="contained" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.TODOS)}>
          Public Todos
        </Styled.Button>
        <Styled.Button variant="outlined" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}>
          Login
        </Styled.Button>
        <Styled.Button variant="outlined" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.REGISTER)}>
          Register
        </Styled.Button>
      </Styled.ButtonContainer>
      <ForgotPassword isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
      <Button variant="text" color="secondary" onClick={() => setModalOpen(true)}>
        Forgot password?
      </Button>
    </Main>
  );
};

export default HomePage;
