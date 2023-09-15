import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Styled from '../auth.styled';
import { TChangePasswordForm } from '../../common/types/user.type';
import userService from '../../../service/user.service';
import { validateChangePassword } from '../validation.util';
import { getErrorMessage } from '../../common/utils/error-message.util';
import { isAuthError } from '../error-boundary/is-auth-error.util';

const initialValues: TChangePasswordForm = {
  password: '',
  newPassword: '',
  confirmNewPassword: ''
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: changePassword,
    error: changePasswordError,
    reset: resetMutation,
    isSuccess
  } = useMutation(userService.changePassword.bind(userService), {
    useErrorBoundary: (error) => isAuthError(error)
  });
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validate: validateChangePassword,
    async onSubmit(values) {
      const { confirmNewPassword, ...submitValues } = values;
      await changePassword(submitValues);
    }
  });

  return (
    <Styled.Main>
      <Dialog color="primary" open={isSuccess} onClose={() => resetMutation()}>
        <Styled.DialogContentContainer>
          <Typography variant="h6">Password successfuly changed</Typography>
        </Styled.DialogContentContainer>
      </Dialog>
      <Styled.TodoForm onSubmit={formik.handleSubmit}>
        <Styled.NavigateButton onClick={() => navigate(-1)}>Back</Styled.NavigateButton>
        <Typography variant="h5">Change Password</Typography>
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
        <Styled.LineText color="red">{formik.errors.newPassword}</Styled.LineText>
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          type="password"
          name="newPassword"
          placeholder="new password"
          disabled={formik.isSubmitting}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />
        <Styled.LineText color="red">{formik.errors.confirmNewPassword}</Styled.LineText>
        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          type="password"
          name="confirmNewPassword"
          placeholder="confirm new password"
          disabled={formik.isSubmitting}
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
        />
        <Styled.LineText color="red">{getErrorMessage(changePasswordError)}</Styled.LineText>
        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
          Change
        </Button>
      </Styled.TodoForm>
    </Styled.Main>
  );
};

export default ChangePassword;
