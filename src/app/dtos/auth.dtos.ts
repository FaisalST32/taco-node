import { UserData } from '../../models/auth/UserData';
import { Gender, SexualOrientation } from '../../typings/profile.types';

export type LoginResponse = {
  authToken: string;
  refreshToken: string;
  userData: UserData;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegistrationDetails = {
  fullName: string;
  username: string;
  password: string;
  age: number;
  gender: Gender;
  sexualOrientation: SexualOrientation;
};
