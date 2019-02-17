import server from '.';

jest.mock('express', () => require('jest-express'));

describe('server', () => {
    it('listen http on 8080 port', () => {
        expect(server.listen).toBeCalledWith(3000);
    });
});