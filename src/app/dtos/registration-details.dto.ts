import { Gender, SexualOrientation } from '../../typings/profile.types';

export type RegistrationDetails = {
  fullName: string;
  username: string;
  password: string;
  age: number;
  gender: Gender;
  sexualOrientation: SexualOrientation;
};
