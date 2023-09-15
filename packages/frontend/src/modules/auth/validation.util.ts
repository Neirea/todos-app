import { FormikValues } from 'formik';
import {
  TChangePasswordForm,
  TForgotPassword,
  TResetPasswordForm,
  TUserLogin,
  TUserRegisterForm
} from '../common/types/user.type';

export const validateEmail = (email: string) => {
  let error;
  if (!email) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = 'Invalid email address';
  }
  return error;
};

export const validatePassword = (password: string) => {
  let error;
  if (!password) {
    error = 'Required';
  } else if (password.length < 6) {
    error = 'Must be 6 or more characters long';
  }
  return error;
};

export const validateLogin = (values: TUserLogin) => {
  const errors: FormikValues = {};
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = validateEmail(values.email);
  }
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
};

export const validateRegister = (values: TUserRegisterForm) => {
  const errors: FormikValues = {};
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = validateEmail(values.email);
  }
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  const confirmPasswordError = validatePassword(values.password);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }
  if (values.password !== values.confirmPassword) {
    errors.password = 'Passwords must match';
  }
  return errors;
};

export const validateChangePassword = (values: TChangePasswordForm) => {
  const errors: FormikValues = {};
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  const newPasswordError = validatePassword(values.newPassword);
  if (passwordError) {
    errors.newPassword = newPasswordError;
  }
  const confirmPasswordError = validatePassword(values.password);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }
  if (values.newPassword !== values.confirmNewPassword) {
    errors.newPassword = 'Passwords must match';
  }
  return errors;
};

export const validateForgotPassword = (values: TForgotPassword) => {
  const errors: FormikValues = {};
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = validateEmail(values.email);
  }
  return errors;
};

export const validateResetPassword = (values: TResetPasswordForm) => {
  const errors: FormikValues = {};
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  const confirmPasswordError = validatePassword(values.password);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }
  if (values.password !== values.confirmPassword) {
    errors.password = 'Passwords must match';
  }
  return errors;
};
