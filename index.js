const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
});

const auth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'somethingidk') {
        next();
    } else {
        throw new Error('You are not authorized');
    }
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

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.use ((err, req, res, next) => {
    console.error('********** Error **********');
    next(err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});