import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/actions')
export class ActionsController implements interfaces.Controller {
  constructor() {}

  @httpGet('/like/:userId')
  public async like(@request() req: Request, @response() res: Response) {}

  @httpGet('/superLike/:userId')
  public async superLike(@request() req: Request, @response() res: Response) {}
}
