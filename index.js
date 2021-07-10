const express = require('express');
const app = express();
const port = 3000;
const maps = require('./map');

// redirect :id to specific webpage
app.get('/:id', function (req, res) {
    const param = req.params.id;
    console.log(param);
    res.redirect(301, maps[param]);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);