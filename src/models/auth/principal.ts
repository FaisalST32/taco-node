import { interfaces } from 'inversify-express-utils';
import { UserData } from './UserData';

export class Principal implements interfaces.Principal {
  public details: UserData;
  public constructor(details: any) {
    this.details = details;
  }
  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }
  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(true);
  }
  public isInRole(role: string): Promise<boolean> {
    return Promise.resolve(this.details.roles.includes(role));
  }
}
