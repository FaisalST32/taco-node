import {
  controller,
  httpPost,
  BaseHttpController,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { ApiPath } from 'swagger-express-ts';
import { AuthService } from '../services/auth.service';
import {
  LoginRequest,
  LoginResponse,
  RegistrationDetails,
} from '../dtos/auth.dtos';
import { Profile } from '../../typings/profile.types';

@ApiPath({
  path: '/api/auth',
  name: 'Auth',
})
@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(TYPES.AuthService) private _authService: AuthService;

  @httpPost('/login')
  public async login(@requestBody() loginDetails: LoginRequest) {
    try {
      const loginResponse: LoginResponse = await this._authService.login(
        loginDetails.username,
        loginDetails.password
      );
      return this.ok(loginResponse);
    } catch (e) {
      console.log(e);
      return this.statusCode(401);
    }
  }

  @httpPost('/register')
  public async register(@requestBody() registrationData: RegistrationDetails) {
    try {
      const registeredUser: Profile = await this._authService.register(
        registrationData
      );
      return this.ok(registeredUser);
    } catch (e) {
      console.log(e);
      return this.badRequest();
    }
  }
  //
  // @ApiOperationGet({
  //   description: 'Get all users',
  //   responses: {
  //     200: {
  //       description: 'Success',
  //       type: SwaggerDefinitionConstant.Response.Type.ARRAY,
  //     },
  //   },
  // })
  // @httpGet('/')
  // public async index(@request() req: Request, @response() res: Response) {
  //   const allUsers = await this._profileService.getAllUsers();
  //   res.status(200).send(allUsers);
  // }
  //
  // @ApiOperationGet({
  //   description: 'Get user by id',
  //   responses: {
  //     200: {
  //       description: 'Success',
  //       type: SwaggerDefinitionConstant.Response.Type.OBJECT,
  //     },
  //   },
  //   path: '/{id}',
  //   parameters: {
  //     path: {
  //       id: {
  //         name: 'id',
  //         type: 'string',
  //       },
  //     },
  //   },
  // })
  // @httpGet('/:id')
  // public async getById(
  //   @requestParam('id') id: string,
  //   @response() res: Response
  // ) {
  //   const profileData = await this._profileService.getUserById(id);
  //   res.status(200).send(profileData);
  // }
  //
  // @ApiOperationPost({
  //   description: 'Save a new user',
  //   responses: {
  //     200: {
  //       description: 'Success',
  //       type: SwaggerDefinitionConstant.Response.Type.OBJECT,
  //     },
  //   },
  //   parameters: {
  //     body: {
  //       name: 'user to add',
  //       properties: {
  //         name: { type: 'string' },
  //         bio: { type: 'string' },
  //         age: { type: 'number' },
  //       },
  //     },
  //   },
  // })
  // @httpPost('/')
  // public async addUser(@request() req: Request, @response() res: Response) {
  //   const userAdded = await this._profileService.addUser(req.body);
  //   res.status(201).send(userAdded);
  // }
}
