import 'reflect-metadata';
import {Get, Post} from '../../../src/decorators/handler';
import { MetadataKeys } from '../../../src/models/decorators';
import CatController from '../../controllers/player';
import {RouteDefinition} from '../../../src/models/decorators';

describe('handler decorater', () => {
    it('should call console.log', () => {
        const catController = new CatController();
        const routers: RouteDefinition[] = Reflect.getMetadata(MetadataKeys.ROUTERS, CatController);
        expect(routers.length).toEqual(3);
    });
});