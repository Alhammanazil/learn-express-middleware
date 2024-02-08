const express = require('express');
const app = express();
const morgan = require('morgan');
const ErrorHandler = require('./ErrorHandler');

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
});

const auth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'somethingidk') {
        next();
    }
    throw new ErrorHandler('You are not authorized', 401);
};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/admin', auth, (req, res) => {
    res.send('Welcome to admin page');
});

app.get('/page', (req, res) => {
    console.log('Time:', req.timeRequest);
    res.send('Hello Page');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

app.get('/general/error', (req, res) => {
    throw new ErrorHandler();
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
    const { status = 403, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});