import express, { Application, Handler } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';

import Redis from 'ioredis';

import * as swaggerDocument from './swagger.json'

import { controllers } from './controllers';
import { MetadataKeys, RouteDefinition } from './models/decorators';

import customErrorHandler from './middlewares/custom-error-handler';

import "./env"

export class App {
  private readonly _instance: Application;

  get instance(): Application {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.set("port", process.env.PORT || 3000);

    this.configureMiddlewares();
    this.registerRouters();
    this._instance.use(customErrorHandler);

    const redis = new Redis({
      port: 6379,
      host: 'redis'
    });

    redis.on('ready', () => {
      console.log('Redis server online...');
    });

    redis.on('error', err => {
      console.log('Redis error: ', err);
    });
  }

  private configureMiddlewares() {
    this._instance.use(express.json());
    // support application/json type post data
    // support application/x-www-form-urlencoded post data
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this._instance.use(helmet());
    this._instance.use(express.json({ limit: '100mb' }));
    this._instance.use(express.urlencoded({ limit: '100mb', extended: true }));
    this._instance.use(cors());


    // // CORS
    // this._instance.use(function (req, res, next) {
    //   res.setHeader("Access-Control-Allow-Origin", "*");
    //   res.setHeader("Access-Control-Allow-Credentials", "true");
    //   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    //   next();
    // });

  }

  private registerRouters() {
    this._instance.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });

    this._instance.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    const info: Array<{ api: string, handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: RouteDefinition[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

      const exRouter = express.Router();

      routers.forEach(({ requestMethod, path, methodName }) => {
        exRouter[requestMethod](path, controllerInstance[String(methodName)].bind(controllerInstance));

        info.push({
          api: `${requestMethod.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(methodName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    console.table(info);
  }
}

export default new App();