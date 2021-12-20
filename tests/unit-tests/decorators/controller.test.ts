import 'reflect-metadata';
import Controller from '../../../src/decorators/controller';
import { MetadataKeys } from '../../../src/models/decorators';

describe('@Controller Decorator', () => {
    @Controller('/xiao')
    class Todos {
        index() {
            return '';
        }
    }

    it('should call console.log', () => {
        const todos = new Todos();

        const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, Todos);

        expect(basePath).toEqual('/xiao');
    });
});