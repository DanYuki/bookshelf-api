const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`The app is listening on localhost:${port}`);
});
