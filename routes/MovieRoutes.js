const express = require('express');
const route = express.Router();

const {
    getMovie,
    getmovieFavorite,
    insertMovieFavorite
} = require('../app/http/controllers/user/UserController');
