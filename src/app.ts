import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import env from './env.config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import AppError from './utils/app-error.util';
import xssAdvanced from 'xss-advanced';
import mongoSanitize from 'express-mongo-sanitize';
import Controller from './abstract/controller.interface';
import UserController from './user-module/user.controller';
import UserService from './user-module/user.service';

/**
 * @App
 * @class App
 * class representing is used to Bootstrap
 * the application.
 * This represents the entry point of the application
 */
class App {
  /**
   * @private
   * private variables are limited to
   * the scop of the class.
   */
  private readonly app: Application = express();
  private readonly APP_ROUTE = '/kerapay.api.v2';
  private controller: Controller[];

  constructor(controllers: Controller[]) {
    this.controller = controllers;

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorMiddleWare();
  }

  public getApp = (): Application => {
    return this.app;
  };

  public initializeMiddleware = (): void => {
    this.app.enable('trust proxy');

    this.app.use(cors({ origin: true, credentials: true }));

    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ limit: '10kb', extended: true }));

    this.app.use(cookieParser());

    // Data Sanitization against NoSQL query injection parameters
    this.app.use(mongoSanitize());

    // Data Sanitization against XSS
    this.app.use(xssAdvanced());

    // Set secure HTTP headers
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'script-src': ["'self'", ''],
            'script-src-elem': ["'self'", ''],
            'frame-src': ["'self'", ''],
          },
        },
      })
    );

    if (env.NODE_ENV === 'development') this.app.use(morgan('dev'));
  };

  private initializeErrorMiddleWare(): void {
    this.app.all('*', (req: Request, _res: Response, next: NextFunction) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
  }

  private initializeRoutes = () => {
    this.controller.forEach((controller) =>
      this.app.use(this.APP_ROUTE, controller.router)
    );
  };
}

/**
 * @exports
 * exported class members.
 * Applying Dependency Inversion
 * allowing loosely coupled applications to be built
 */
export default new App([new UserController(new UserService())]);
