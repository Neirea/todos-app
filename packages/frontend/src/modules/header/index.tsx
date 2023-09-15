import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import * as Styled from './header.styled';
import { APP_KEYS } from '../common/consts';
import useCurrentUser from '../common/hooks/current-user.hook';

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoading } = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.ME]);
    queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
  };

  return (
    <Styled.Header>
      <Styled.HeaderContainer>
        <Button variant="outlined" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}>
          Home
        </Button>
        {!isLoading && (
          <Styled.AuthContainer>
            {user ? (
              <>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD)}
                >
                  Profile
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}
              >
                Log in
              </Button>
            )}
          </Styled.AuthContainer>
        )}
      </Styled.HeaderContainer>
    </Styled.Header>
  );
};

export default Header;
