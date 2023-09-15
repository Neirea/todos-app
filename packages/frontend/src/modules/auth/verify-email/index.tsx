import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import userService from '../../../service/user.service';
import * as Styled from '../auth.styled';
import { getErrorMessage } from '../../common/utils/error-message.util';
import { APP_KEYS } from '../../common/consts';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const { error, isSuccess } = useQuery([APP_KEYS.QUERY_KEYS.VERIFY], () =>
    userService.verifyEmail({ email, token })
  );

  return (
    <Styled.Main>
      {error && (
        <>
          <Typography variant="h1" color="red">
            Error
          </Typography>
          <Typography variant="h3">{getErrorMessage(error)}</Typography>
        </>
      )}
      {isSuccess && (
        <>
          <Typography variant="h3">Your account is now verified</Typography>
          <Link component={RouterLink} to={APP_KEYS.ROUTER_KEYS.LOGIN} underline="hover">
            <Typography variant="h4">Login</Typography>
          </Link>
        </>
      )}
    </Styled.Main>
  );
};

export default VerifyEmail;
