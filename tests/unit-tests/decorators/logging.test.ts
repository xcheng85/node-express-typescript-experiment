
import { logIndex } from '../../../src/decorators/logging';

describe('@logIndex Decorator', () => {
    @logIndex
    class Todos {
        index() {
            return '';
        }
    }

    it('should call console.log', () => {
        const spy = jest.spyOn(console, 'log');
        const todos = new Todos().index();
        expect(spy).toBeCalledWith('aaa');
    });
});

