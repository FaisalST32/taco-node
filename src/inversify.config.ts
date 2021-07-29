import { Container } from 'inversify';
import { ProfileService } from './app/services/profile.service';

export const TYPES = {
  ProfileService: Symbol('ProfileService'),
};

const container = new Container();

container
  .bind<ProfileService>(TYPES.ProfileService)
  .to(ProfileService)
  .inRequestScope();

export default container;
