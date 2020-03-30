import express from 'express'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import routes from '../api/modules';

const app = express();

const allowCrossDomain = (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','*')
    res.header('Access-Control-Allow-Headers','*')
    next();
}

app.use(session({
    secret : 'secret',
    saveUninitialized : true,
    resave : true
}))


app.use(passport.initialize())
app.use(passport.session())

require('./passport');

app.use(allowCrossDomain)
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use('/api', routes);

module.exports = app;