const express = require('express');
const bodyParser = require('body-parser');
const app  = express();

// DB Connection
const { db_url, options } = require('./app/config/config');

// import the route
const UserRoute = require('./routes/UserRoutes');
const MovieRoute = require('./routes/MovieRoutes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.json({message : "Welcome dude"});
});

app.use("/api/v1/users", UserRoute);
// app.use("/api/v1/movies", MovieRoute);

app.listen(3000, () => {
    console.log(`Server started on port`);
});