import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from 'inversify-express-utils';
import { ProfileService } from '../services/profile.service';
import { TYPES } from '../../inversify/types';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { Passion, Profile } from '../../typings/profile.types';

@controller('/profiles')
export class ProfilesController implements interfaces.Controller {
  private _profileService: ProfileService;
  constructor(@inject(TYPES.ProfileService) profileService: ProfileService) {
    this._profileService = profileService;
  }

  @httpGet('/')
  public async getAllProfiles(
    @request() req: Request,
    @response() res: Response
  ) {
    const allProfiles = await this._profileService.getAllProfiles();
    console.log(allProfiles);
    res.status(200).send(allProfiles);
  }

  @httpPost('/')
  public async createProfile(
    @request() req: Request<any, any, Profile>,
    @response() res: Response
  ) {
    const savedProfile = await this._profileService.saveProfile(req.body);
    res.status(200).send(savedProfile);
  }

  @httpGet('/passions')
  public async getPassions(@request() req: Request, @response() res: Response) {
    const passions: Passion[] = await this._profileService.getAllPassions();
    res.status(200).send(passions);
  }
}
