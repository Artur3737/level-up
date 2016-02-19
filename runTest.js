const express = require('express');
const app = express();

app.use( express.static(__dirname + '/public')); // ← adjust
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.tests.html');
});
const server = app.listen(9009, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Tests run at ${host} ${port}`);
});