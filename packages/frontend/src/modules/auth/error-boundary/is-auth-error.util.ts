import { AxiosError } from 'axios';

export const isAuthError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
};
