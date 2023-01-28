import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../@types/user.type';

import env from '../env.config';
import AppError from '../utils/app-error.util';
import catchAsync from '../utils/catchAsync.util';
import { Roles } from '../enums/roles.enum';

/**
 * This middleware is for guarding protected routes
 */
class Guards {
  private readonly user = [] as User[];
  public authGuard = catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      // 1) Get token from cookie
      const token: string = req.cookies['jwt'];

      // 2) Check if token exist in cookie
      if (!token)
        return next(
          new AppError('Unauthorized access, please login to continue', 401)
        );

      // 3)  decode token
      const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

      // 4) use value of sub (sub.id) to find user in the database
      const currentUser = this.user.find(({ id }) => id === decoded.sub);

      if (!currentUser) {
        throw new AppError(
          'This user does not exist anymore. Please log in again.',
          401
        );
      }
      // 5) Add user to request object.
      req.currentUser = currentUser;
      next();
    }
  );

  public roleGuard =
    (...roles: Roles[]) =>
    // middleware function gets access to the roles parameter cause of the closure
    (req: Request, _res: Response, next: NextFunction): void => {
      if (!roles.some((item: Roles) => req.currentUser.roles.includes(item))) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
}

export default Guards;
