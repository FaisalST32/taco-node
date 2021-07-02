import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { inject } from "inversify";
import { TYPES } from "../../inversify.config";

@controller("/profile")
export class ProfileController implements interfaces.Controller {
  private _profileService: ProfileService;
  constructor(@inject(TYPES.ProfileService) profileService: ProfileService) {
    this._profileService = profileService;
  }

  @httpGet("/")
  public async index(@request() req: Request, @response() res: Response) {
    const profileData = await this._profileService.getUser();
    res.status(200).send(profileData);
  }

  @httpPost("/")
  public async addUser(@request() req: Request, @response() res: Response) {
    const userAdded = await this._profileService.addUser(req.body);
    res.status(201).send(userAdded);
  }
}
