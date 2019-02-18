import express from 'express';
import {createServer} from 'http';
import SocketIO from 'socket.io';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

const app = express();
const mode = process.env.NODE_ENV;
const cfg = Object.assign(webpackConfig, {
    mode: mode && mode !== 'test' ? mode : 'development'
})
app.use(webpackMiddleware(webpack(cfg), {
    // stats: 'none',
}));

const server = createServer(app);
const io = SocketIO(server);

let lastPlayerID = 0;

io.on('connection', (socket) => {
    socket.on('add-player', () => {
        const player = {
            id: ++lastPlayerID,
            x: randomInt(100, 400),
            y: randomInt(100, 400),
        }
        console.log('add-player', player);
        io.emit('added-player', player);
    })
})

server.listen(8080, () => {
    console.log('Listening');
});

export default server;