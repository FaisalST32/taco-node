import express from 'express';
import { interfaces } from 'inversify-express-utils';

const authMiddlewareFactory = () => (role?: string) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const httpContext: interfaces.HttpContext = Reflect.getMetadata(
      'inversify-express-utils:httpcontext',
      req
    );

    const principal: interfaces.Principal = httpContext.user;
    const isAuthenticated = await principal.isAuthenticated();
    if (!isAuthenticated) {
      console.log('user not authenticated');
      res.sendStatus(401);
      return;
    }
    const isInRole = !role || (await principal.isInRole(role));
    if (!isInRole) {
      console.log('user does not have role');
      res.sendStatus(401);
      return;
    }
    next();
  };
};

const authorize = authMiddlewareFactory();

export { authorize };
