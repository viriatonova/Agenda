require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// DB conection
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('pronto');
})
.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
// flash após as sessões pois são salvas nas sessões
const flash = require('connect-flash');
const routes =  require('./routes.js');
const path = require('path');
// const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/default');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Arquivos estáticos para a aplicação
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// app.use(helmet());
app.use(csrf());

//Middleware
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Routes
app.use(routes);

// Start app 
app.on('pronto', () => {
    app.listen(53000, () => {
        console.log('Servidor executando na porta 53000');
        console.log('Acesso ao servidor: http://localhost:53000');
    });
});
