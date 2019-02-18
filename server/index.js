import express from 'express';
import {createServer} from 'http';
import SocketIO from 'socket.io';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

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

io.on('connection', (socket) => {
    socket.on('add-player', () => {
        console.log('added');
    })
})

server.listen(8080, () => {
    console.log('Listening');
});

export default server;