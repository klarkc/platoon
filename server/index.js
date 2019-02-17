import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(8080, () => {
    console.log('Listening');
});

export default app;