import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useCurrentUser from '../../common/hooks/current-user.hook';
import { LoadingSpinner } from '../../common/components/loading-spinner';
import * as Styled from '../auth.styled';
import { TUserRegisterForm } from '../../common/types/user.type';
import userService from '../../../service/user.service';
import { getErrorMessage } from '../../common/utils/error-message.util';
import { validateRegister } from '../validation.util';
import { APP_KEYS } from '../../common/consts';

const initialValues: TUserRegisterForm = {
  email: '',
  password: '',
  confirmPassword: ''
};

const Register = () => {
  const navigate = useNavigate();
  const { isLoading } = useCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const { mutateAsync: register, error: registerError } = useMutation(
    userService.register.bind(userService)
  );
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validate: validateRegister,
    async onSubmit(values) {
      const { confirmPassword, ...submitValues } = values;
      const ok = await register(submitValues);
      if (!ok) return;
      formik.resetForm();
      setModalOpen(true);
    }
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleModalClose = () => {
    setModalOpen(false);
    navigate(APP_KEYS.ROUTER_KEYS.ROOT);
  };

  return (
    <Styled.Main>
      <Dialog color="primary" open={modalOpen} onClose={handleModalClose}>
        <Styled.DialogContentContainer>
          <Typography variant="h6">Verification email sent</Typography>
          <Button variant="outlined" onClick={handleModalClose}>
            OK
          </Button>
        </Styled.DialogContentContainer>
      </Dialog>
      <Styled.TodoForm onSubmit={formik.handleSubmit}>
        <Styled.NavigateButton onClick={() => navigate(-1)}>Back</Styled.NavigateButton>
        <Typography variant="h5">Register</Typography>
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
        <Styled.LineText color="red">{getErrorMessage(registerError)}</Styled.LineText>
        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
          Register
        </Button>
      </Styled.TodoForm>
    </Styled.Main>
  );
};

export default Register;
