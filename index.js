const express = require('express');
const app = express();
morgan = require('morgan');

app.use(morgan('dev'));

app.get('/page', (req, res) => {
    res.send('Hello Page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});