require('../index.js');
const client = require('../client.js');

jest.mock('../client.js');

describe('index', () => {
    it('starts the client', () => {
        expect(client).toBeCalled();
    });
})