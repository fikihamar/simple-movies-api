// const express = require('express');
// const route = express.Router();

// const {
//     getUser,
//     login
// } = require('../app/http/controllers/user/UserController');

// route.post('/login', check("email").isEmail(), login);
// route.get('/', getUser);
module.exports = app => {
    const user = require("../app/http/controllers/user/UserController");

    app.get("/", user.findAll);
    app.post('/login', user.signup);
}
