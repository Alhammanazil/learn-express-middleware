const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
});

// Middleware for login check
function checkLogin(req, res, next) {
    if (req.session && req.session.user) {
        // If user is already logged in, redirect to dashboard page
        res.redirect('/dashboard');
    } else {
        // If user is not logged in, allow access to login page
        next();
    }
}

const auth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'somethingidk') {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
};

app.get('/', checkLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        req.session.user = username; // Set session if login is successful
        res.redirect('/dashboard');
    } else {
        res.send('Login failed. Invalid username or password.');
    }
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
