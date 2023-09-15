import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TResetPassword, TResetPasswordForm } from '../../common/types/user.type';
import { APP_KEYS } from '../../common/consts';
import { getErrorMessage } from '../../common/utils/error-message.util';
import userService from '../../../service/user.service';
import { validateResetPassword } from '../validation.util';
import * as Styled from '../auth.styled';

const initialValues: TResetPasswordForm = {
  password: '',
  confirmPassword: ''
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const navigate = useNavigate();
  const { mutateAsync: resetPassword, error: resetPasswordError } = useMutation(
    userService.resetPassword.bind(userService)
  );
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validate: validateResetPassword,
    async onSubmit(values) {
      const submitValues: TResetPassword = {
        email,
        token,
        password: values.password
      };
      const ok = await resetPassword(submitValues);
      if (ok) navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
    }
  });
  return (
    <Styled.Main>
      <Styled.TodoForm onSubmit={formik.handleSubmit}>
        <Styled.NavigateButton onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}>
          Home
        </Styled.NavigateButton>
        <Typography variant="h5">Reset Password</Typography>
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
        <Styled.LineText color="red">{formik.errors.confirmPassword}</Styled.LineText>
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          disabled={formik.isSubmitting}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <Styled.LineText color="red">{getErrorMessage(resetPasswordError)}</Styled.LineText>
        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
          Change
        </Button>
      </Styled.TodoForm>
    </Styled.Main>
  );
};

export default ResetPassword;
