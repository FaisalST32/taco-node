import { injectable } from 'inversify';
import { MOCK_USER_ID } from '../../constants/user.constants';
import { User } from '../../models/auth/User';

@injectable()
export class AuthService {
  getLoggedInUserId(): Promise<string> {
    return Promise.resolve(MOCK_USER_ID);
  }

  async getUserFromToken(token: string): Promise<User> {
    return {
      email: 'admin@admin.com',
      id: 'someId',
      roles: ['user', 'admin'],
      fullName: 'Admin',
    };
  }
}
