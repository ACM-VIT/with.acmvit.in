const express = require('express');
const app = express();
const port = 3000;
const maps = require('./map');

// redirect :id to specific webpage
app.get('/:id', function (req, res) {
    const param = req.params.id;
    const redirect_to = maps.map(({ title, url }) => { if (title == param) return url; });
    res.redirect(301, redirect_to[0]);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);