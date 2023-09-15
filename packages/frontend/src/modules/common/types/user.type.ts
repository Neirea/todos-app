export type TToken = string;

export type TUser = {
  id: string;
  email: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserRegister = TUserLogin;
export type TUserRegisterForm = TUserRegister & { confirmPassword: string };

export type TVerifyEmail = {
  email: string;
  token: TToken;
};

export type TChangePassword = {
  password: string;
  newPassword: string;
};
export type TChangePasswordForm = TChangePassword & { confirmNewPassword: string };

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = TVerifyEmail & {
  password: string;
};
export type TResetPasswordForm = {
  password: string;
  confirmPassword: string;
};
