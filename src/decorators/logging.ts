import { Request } from "express";

export function logIndex(constructor: Function) {
    const original = constructor.prototype.index;
  
    constructor.prototype.index = function() {
      console.log(`aaa`);
      return original.apply(this, arguments);
    };
  }
  

export function routeLogging(): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let request = args[0] as Request;

            const {
                url,
                method,
                body,
                headers,
            } = request;

            console.log("[LOG]", {
                url,
                method,
                body,
                headers,
            });

            return original.apply(this, args);
        }
    };
}