const express = require('express')
const app = express()
const PORT = 7070
const HOST = 'localhost'
const router = require('./router/index');

app.use('/api', router);
app.listen(PORT, HOST, function (res) {
    console.info(`Museum server started@ ${HOST}:${PORT}`);
  });