const express = require('express');
const modulesMiddleware = require('modules-middleware');

module.exports = (port = 3000, hostname = 'localhost') => {
    const app = express();
    app.use(modulesMiddleware('libs'));
    app.use(express.static('public'));
    app.listen(port, hostname);
    return app;    
}