import React from 'react';
import { useMutation } from 'react-query';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { TForgotPassword } from '../../common/types/user.type';
import { validateForgotPassword } from '../validation.util';
import userService from '../../../service/user.service';
import { getErrorMessage } from '../../common/utils/error-message.util';
import * as Styled from '../auth.styled';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const initialValues: TForgotPassword = {
  email: ''
};

const ForgotPassword = ({ isOpen, closeModal }: Props) => {
  const {
    mutateAsync: forgotPassword,
    error: forgotPasswordError,
    reset: resetMutation,
    isSuccess
  } = useMutation(userService.forgotPassword.bind(userService));
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validate: validateForgotPassword,
    onSubmit(values) {
      forgotPassword(values);
    }
  });

  const handleModalClose = () => {
    resetMutation();
    closeModal();
  };

  return (
    <Dialog onClose={handleModalClose} open={isOpen}>
      {!isSuccess ? (
        <Styled.TodoForm onSubmit={formik.handleSubmit}>
          <Typography variant="h5">Forgot Password</Typography>
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
          <Styled.LineText color="red">{getErrorMessage(forgotPasswordError)}</Styled.LineText>
          <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
            Send
          </Button>
        </Styled.TodoForm>
      ) : (
        <Styled.DialogContentContainer>
          <Typography variant="h4">Email with reset link has been sent</Typography>
          <Button variant="outlined" onClick={closeModal}>
            Close
          </Button>
        </Styled.DialogContentContainer>
      )}
    </Dialog>
  );
};

export default ForgotPassword;
