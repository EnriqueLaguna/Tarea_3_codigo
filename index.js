const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//Duda principal, como uso postgresql?. Tengo que usar docker? hay alguna manera de NO usar docker?

const animalsRouter = require('./Routes/animals');
const usersRouter = require('./Routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.engine('handlebars', hbs({extname: 'handlebars', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

app.use('/animals', animalsRouter);
app.use('/users', usersRouter);

//Middlewares
//Authentication invalid route, return  404 not found

app.use((req, res, next) => {
    res.status(404).send('The route was not found 404, index');
    next();
});



app.listen(3001, ()=> {
    console.log("escuchando en el puerto 3001");
});



