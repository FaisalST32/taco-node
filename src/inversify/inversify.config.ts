import { Container } from 'inversify';
import { ProfileService } from '../app/services/profile.service';
import { ActionsService } from '../app/services/actions.service';
import { AuthService } from '../app/services/auth.service';
import { TYPES } from './types';

const container = new Container();

container
  .bind<ProfileService>(TYPES.ProfileService)
  .to(ProfileService)
  .inRequestScope();

container
  .bind<ActionsService>(TYPES.ActionsService)
  .to(ActionsService)
  .inRequestScope();

container.bind<AuthService>(TYPES.AuthService).to(AuthService).inRequestScope();

export default container;
