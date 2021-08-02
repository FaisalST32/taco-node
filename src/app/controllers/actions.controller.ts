import {
  controller,
  httpGet,
  interfaces,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { ActionsService } from '../services/actions.service';
import { TYPES } from '../../inversify/types';
import { inject } from 'inversify';

@controller('/actions')
export class ActionsController implements interfaces.Controller {
  private _actionsService: ActionsService;
  constructor(@inject(TYPES.ActionsService) actionsService: ActionsService) {
    this._actionsService = actionsService;
  }

  @httpGet('/like/:userId')
  public async like(
    @requestParam('userId') userId: string,
    @response() res: Response
  ) {
    try {
      const likeRegistered = await this._actionsService.likeProfile(
        userId,
        false
      );
      if (likeRegistered) res.status(200).send();
      res.status(500).send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  @httpGet('/likes')
  public async getLikesForUser(
    @request() req: Request,
    @response() res: Response
  ) {
    const userLikes = await this._actionsService.getUserLikes();
    res.status(200).send(userLikes);
  }

  @httpGet('/superLike/:userId')
  public async superLike(
    @requestParam('userId') userId: string,
    @response() res: Response
  ) {
    try {
      const likeRegistered = await this._actionsService.likeProfile(
        userId,
        true
      );
      if (likeRegistered) res.status(200).send();
      res.status(500).send();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
