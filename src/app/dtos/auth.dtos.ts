import { UserData } from '../../models/auth/UserData';

export type LoginResponse = {
  authToken: string;
  refreshToken: string;
  userData: UserData;
};
