import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { ProfileService } from '../services/profile.service';
import { TYPES } from '../../inversify/types';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { Passion, Profile } from '../../typings/profile.types';
import { authorize } from '../middlewares/auth.middleware';

@controller('/profiles')
export class ProfilesController extends BaseHttpController {
  @inject(TYPES.ProfileService) private _profileService: ProfileService;

  @httpGet('/')
  public async getAllProfiles(
    @request() req: Request,
    @response() res: Response
  ) {
    const allProfiles = await this._profileService.getAllProfiles();
    console.log(allProfiles);
    return this.ok(allProfiles);
  }

  @httpPost('/')
  public async createProfile(
    @request() req: Request<any, any, Profile>,
    @response() res: Response
  ) {
    const savedProfile = await this._profileService.saveProfile(req.body);
    return this.ok(savedProfile);
  }

  @httpGet('/passions', authorize('user'))
  public async getPassions(@request() req: Request, @response() res: Response) {
    console.log(this.httpContext.user);
    const passions: Passion[] = await this._profileService.getAllPassions();
    return this.ok(passions);
  }
}
