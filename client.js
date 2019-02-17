const express = require('express');

module.exports = (port = 3000, hostname = 'localhost') => {
    const app = express();
    app.use(express.static('public'));
    app.listen(port, hostname);
    return app;    
}