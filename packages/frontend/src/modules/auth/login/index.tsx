import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { APP_KEYS } from '../../common/consts';
import * as Styled from '../auth.styled';
import { TUserLogin } from '../../common/types/user.type';
import userService from '../../../service/user.service';
import { getErrorMessage } from '../../common/utils/error-message.util';
import { validateLogin } from '../validation.util';

const initialValues: TUserLogin = {
  email: '',
  password: ''
};

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: login, error: loginError } = useMutation(
    userService.login.bind(userService)
  );
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validate: validateLogin,
    async onSubmit(values) {
      const token = await login(values);
      if (!token) return;
      localStorage.setItem('token', token);
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.ME]);
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
      navigate(APP_KEYS.ROUTER_KEYS.TODOS);
    }
  });

  return (
    <Styled.Main>
      <Styled.TodoForm onSubmit={formik.handleSubmit}>
        <Styled.NavigateButton onClick={() => navigate(-1)}>Back</Styled.NavigateButton>
        <Typography variant="h5">Login</Typography>
        <Styled.LineText color="red">{formik.errors.email}</Styled.LineText>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="email"
          placeholder="email"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Styled.LineText color="red">{formik.errors.password}</Styled.LineText>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          placeholder="password"
          disabled={formik.isSubmitting}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Styled.LineText color="red">{getErrorMessage(loginError)}</Styled.LineText>
        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
          Login
        </Button>
      </Styled.TodoForm>
    </Styled.Main>
  );
};

export default Login;
