const express = require('express');

const client = require('../client.js');

jest.mock('express', () => require('jest-express'));

describe('client', () => {
    it('set game static directories', () => {
        const app = client();
        expect(express.static).toHaveBeenCalledWith('public');
        expect(app).toBeInstanceOf(express.Express);
        expect(app.use).toBeCalled();
    });

    it('listen on 3000 port in localhost', () => {
        const app = client(3000, 'localhost');
        expect(app).toBeInstanceOf(express.Express);
        expect(app.listen).toHaveBeenCalledWith(3000, 'localhost');
    });

    it('listen with def args', () => {
        const app = client();
        expect(app).toBeInstanceOf(express.Express);
        expect(app.listen).toHaveBeenCalledWith(3000, 'localhost');
    });
})