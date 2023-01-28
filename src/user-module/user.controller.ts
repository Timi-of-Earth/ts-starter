import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../abstract/controller.interface';
import { User } from '../@types/user.type';

import Guard from '../middleware/guard.middleware';
import { Roles } from '../enums/roles.enum';

import catchAsync from '../utils/catchAsync.util';
import UserService from './user.service';

class UserController implements Controller {
  public readonly router = Router();
  public readonly path: string = '/user';
  private readonly userService: UserService;

  private readonly guard = new Guard();

  constructor(userService: UserService) {
    this.userService = userService;
    this.initializeRoutes();
  }
  private initializeRoutes = (): void => {
    this.router
      .route(this.path)
      .get(
        this.guard.authGuard,
        this.guard.roleGuard(Roles.ADMIN),
        this.getAllUsers
      );
    this.router
      .route(`${this.path}/:id`)
      .get(
        this.guard.authGuard,
        this.guard.roleGuard(Roles.ADMIN),
        this.getUserById
      )
      .delete(
        this.guard.authGuard,
        this.guard.roleGuard(Roles.ADMIN),
        this.deleteUserById
      );
    this.router.patch(
      `${this.path}/employee`,
      this.guard.authGuard,
      this.updateUserRole
    );
    this.router.patch(
      `${this.path}/update-me`,
      this.guard.authGuard,
      this.updateUserDetails
    );
  };

  private getAllUsers = catchAsync(
    async (
      _req: Request,
      res: Response,
      _next: NextFunction
    ): Promise<void> => {
      const users = await this.userService.getAllUsers();

      res.status(200).json({
        status: 'success',
        data: { users },
      });
    }
  );

  private getUserById = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const { id } = req.params;

      const user = await this.userService.getUserById(id);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    }
  );

  private updateUserRole = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { roles }: User = req.body;
      const user = await this.userService.updateUserRole(
        req.currentUser,
        roles
      );

      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: { user },
      });
    }
  );

  private updateUserDetails = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = await this.userService.updateUserDetails(
        req.body,
        req.currentUser.id
      );
      res.status(200).json({
        status: 'success',
        message: 'user updated successfully',
        data: { user },
      });
    }
  );

  private deleteUserById = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const { id } = req.params;
      await this.userService.deleteUserById(id);

      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    }
  );
}

export default UserController;
