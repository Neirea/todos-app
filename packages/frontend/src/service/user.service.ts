import { APP_KEYS } from '../modules/common/consts';
import type {
  TChangePassword,
  TForgotPassword,
  TResetPassword,
  TToken,
  TUser,
  TUserLogin,
  TUserRegister,
  TVerifyEmail
} from '../modules/common/types/user.type';
import HttpService from './http.service';

class UserService extends HttpService {
  async getMe() {
    const result = await this.get<TUser>({ url: `${APP_KEYS.BACKEND_KEYS.USER}/me` });
    return result.data;
  }

  async register(data: TUserRegister) {
    const result = await this.post<boolean>({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/register`,
      data
    });
    return result.data;
  }

  async verifyEmail(data: TVerifyEmail) {
    const result = await this.post<boolean>({ url: `${APP_KEYS.BACKEND_KEYS.USER}/verify`, data });
    return result.data;
  }

  async login(data: TUserLogin) {
    const result = await this.post<TToken>({ url: `${APP_KEYS.BACKEND_KEYS.USER}/login`, data });
    return result.data;
  }

  async changePassword(data: TChangePassword) {
    const result = await this.post<boolean>({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/change-password`,
      data
    });
    return result.data;
  }

  async forgotPassword(data: TForgotPassword) {
    const result = await this.post<boolean>({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/forgot-password`,
      data
    });
    return result.data;
  }

  async resetPassword(data: TResetPassword) {
    const result = await this.post<boolean>({
      url: `${APP_KEYS.BACKEND_KEYS.USER}/reset-password`,
      data
    });
    return result.data;
  }
}

const userService = new UserService();

export default userService;
