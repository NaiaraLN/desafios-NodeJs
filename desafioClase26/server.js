import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import handlebars from "express-handlebars";
import localProdRouter from './router/formProductsRouter.js';
import {routerProducts} from './router/productRoutes.js'
import routerMessages from './router/messagesRouter.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import  {Strategy as LocalStrategy} from 'passport-local';
import User from './utils/users.js'
import bCrypt from 'bcrypt'


const userDB = new User(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.1ezwxyq.mongodb.net/ecommerce?retryWrites=true&w=majority`)

/* -------------PASSPORT-------------- */
passport.use('register', new LocalStrategy({
    passReqToCallback:true
}, async (req,username,password, done) => {
    const {mail} = req.body
    const userdb = await userDB.getUser(username)
    if (userdb ==! null || userdb ==! undefined) {
        return done('already registered')
    }
    const newUser = {
        username: username,
        mail: mail,
        password: createHash(password)
    }
    await userDB.saveUser(newUser)
    const user = await userDB.getUser(username)
    return done(null, user)
}));

passport.use('login', new LocalStrategy(async (username,password,done) => {
    const user = await userDB.getUser(username)
    if (!user) {
        return done(null, false)
    }
    const userPws = user.password
    if(isValidPassword(userPws, password)){
        return done(null, false)
    }
    return done(null, user)
}));

function createHash(password) {
    return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null);
}
function isValidPassword(userPsw, password) {
    return bCrypt.compareSync(password, userPsw);
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userDB.model.findById(id, done);
});
const app = express();

// configuro _dirname
import {URL} from 'url'

const _dirname = decodeURI(new URL('.', import.meta.url).pathname)

// Configuro views
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
};
app.engine("hbs", handlebars.engine((handlebarsConfig)));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(_dirname + '/public'));

app.use('/api/productos-test', routerProducts);
app.use('/api/mensajes', routerMessages);
app.use('/api/productos', localProdRouter)


// configuro las sesiones con Mongo Atlas
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.1ezwxyq.mongodb.net/sesionesDesafio?retryWrites=true&w=majority`, 
        mongoOptions:advancedOptions,
        ttl:600
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling:true
}))
app.use(passport.initialize());
app.use(passport.session());

/* ---AUTH--- */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
/* ---ROUTES--- */

app.get("/", isAuth, (req, res) => {
    res.render('table', {userName:req.user.username})
})

// REGISTER
app.get('/register', (req, res) =>{
    res.render('register')
})
app.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

app.get('/failregister', (req, res) =>{
    res.render('register-error')
})

// LOGIN
app.get('/login', (req, res) =>{
    res.render('login')
})
app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))
app.get('/faillogin', (req,res) => {
    res.render('login-error')
})

// LOGOUT
app.get('/logout', (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))