const express = require('express');

module.exports = () => {
    const app = express();
    app.use(express.static('public'));
    app.listen(3000);
    return app;    
}