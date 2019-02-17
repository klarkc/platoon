import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

const app = express();
const mode = process.env.NODE_ENV;
const cfg = Object.assign(webpackConfig, {
    mode: mode && mode !== 'test'?mode:'development'
})
app.use(webpackMiddleware(webpack(cfg), {
    // stats: 'none',
}));

app.listen(8080, () => {
    console.log('Listening');
});

export default app;