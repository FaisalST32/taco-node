import { injectable } from 'inversify';
import { MOCK_USER_ID } from '../../constants/user.constants';
import { User } from '../../models/auth/User';
import { UserData } from '../../models/auth/UserData';
import { UserModel } from '../data/models/user.model';
import jwt from 'jsonwebtoken';
import { LoginResponse } from '../dtos/auth.dtos';
import { Profile } from '../../typings/profile.types';
import { RegistrationDetails } from '../dtos/registration-details.dto';
import { ProfileModel } from '../data/models/profile.model';
import mongodb from 'mongodb';

@injectable()
export class AuthService {
  getLoggedInUserId(): Promise<string> {
    return Promise.resolve(MOCK_USER_ID);
  }

  async getUserFromToken(token: string): Promise<UserData> {
    return {
      username: 'admin@admin.com',
      id: 'foo',
      roles: ['user', 'admin'],
      fullName: 'Admin',
    };
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const userFound = await UserModel.findOne({ username });
    if (!userFound) {
      throw new Error('user not found');
    }

    const isPasswordValid = userFound.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error('invalid credentials');
    }

    const authToken = AuthService.createAuthToken(userFound.toObject());
    userFound.handleRefreshTokenReset();
    return {
      authToken,
      refreshToken: userFound.refreshToken,
      userData: {
        id: userFound._id.toHexString(),
        username: userFound.username,
        roles: userFound.roles,
        fullName: userFound.fullName,
      },
    };
  }

  async register(registrationDetails: RegistrationDetails): Promise<Profile> {
    const profileData: Profile = {
      fullName: registrationDetails.fullName,
      age: registrationDetails.age,
      gender: registrationDetails.gender,
      sexualOrientation: registrationDetails.sexualOrientation,
      about: '',
      profileMedia: [],
      passions: [],
    };

    const savedProfile = await new ProfileModel(profileData).save();

    const userDetails = new UserModel({
      _id: new mongodb.ObjectID(),
      fullName: registrationDetails.fullName,
      username: registrationDetails.username,
      roles: ['user'],
      profile: savedProfile._id,
    });
    userDetails.setPassword(registrationDetails.password);
    await userDetails.save();
    return savedProfile.toObject();
  }

  private static createAuthToken(userDetails: User): string {
    return jwt.sign(
      {
        user_id: userDetails._id,
        email: userDetails.username,
        name: userDetails.fullName,
      },
      process.env.SIGNING_KEY,
      {
        expiresIn: '1h',
      }
    );
  }
}
