export enum MetadataKeys {
    BASE_PATH = 'base_path',
    ROUTERS = 'routers',
};

export type RequestMethod = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export interface RouteDefinition {
    path: string;
    // HTTP Request method (get, post, ...)
    requestMethod: RequestMethod;
    // Method name within the class responsible for this route
    methodName: string | symbol;
};
