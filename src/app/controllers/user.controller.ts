import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiPath({
  path: '/api/profile',
  name: 'Profile',
})
@controller('/users')
export class UserController implements interfaces.Controller {
  private _profileService: ProfileService;
  constructor(@inject(TYPES.ProfileService) profileService: ProfileService) {
    this._profileService = profileService;
  }

  @ApiOperationGet({
    description: 'Get all users',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
    },
  })
  @httpGet('/')
  public async index(@request() req: Request, @response() res: Response) {
    const allUsers = await this._profileService.getAllUsers();
    res.status(200).send(allUsers);
  }

  @ApiOperationGet({
    description: 'Get user by id',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      },
    },
    path: '/{id}',
    parameters: {
      path: {
        id: {
          name: 'id',
          type: 'string',
        },
      },
    },
  })
  @httpGet('/:id')
  public async getById(
    @requestParam('id') id: string,
    @response() res: Response
  ) {
    const profileData = await this._profileService.getUserById(id);
    res.status(200).send(profileData);
  }

  @ApiOperationPost({
    description: 'Save a new user',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      },
    },
    parameters: {
      body: {
        name: 'user to add',
        properties: {
          name: { type: 'string' },
          bio: { type: 'string' },
          age: { type: 'number' },
        },
      },
    },
  })
  @httpPost('/')
  public async addUser(@request() req: Request, @response() res: Response) {
    const userAdded = await this._profileService.addUser(req.body);
    res.status(201).send(userAdded);
  }
}
