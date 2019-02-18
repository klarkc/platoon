import server from '.';

jest.mock('webpack');
jest.mock('webpack-dev-middleware');
jest.mock('../webpack.config.js');

jest.mock('express', () => require('jest-express'));

describe('server', () => {
    it.skip('listen http on 8080 port', () => {
        expect(server.listen).toBeCalledWith(8080, expect.any(Function));
    });
});