import { injectable } from 'inversify';
import { MOCK_USER_ID } from '../../constants/user.constants';

@injectable()
export class AuthService {
  getLoggedInUserId(): Promise<string> {
    return Promise.resolve(MOCK_USER_ID);
  }
}
