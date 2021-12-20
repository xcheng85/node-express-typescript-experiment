import { MetadataKeys, RequestMethod, RouteDefinition } from '../models/decorators';

const methodDecoratorFactory = (requestMethod: RequestMethod) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;

      const routers: RouteDefinition[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];

      routers.push({
        requestMethod,
        path,
        methodName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export const Get = methodDecoratorFactory('get');
export const Post = methodDecoratorFactory('post');