import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import * as express from 'express';
import { AuthService } from '../services/auth.service';
import { TYPES } from '../../inversify/types';
import { Principal } from '../../models/auth/principal';
// import { logWithTimer } from '../utils/logging.utils';

const authService = inject(TYPES.AuthService);

@injectable()
export class JwtAuthProvider implements interfaces.AuthProvider {
  @authService private readonly _authService: AuthService;

  public async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return;
    const token = authHeader.split(' ')[1];
    const user = await this._authService.getUserFromToken(
      Array.isArray(token) ? token[0] : token
    );
    return new Principal(user);
  }
}
