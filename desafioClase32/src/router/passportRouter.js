import { Router } from "express";
import passport from "passport";
import  {Strategy as LocalStrategy} from 'passport-local';
import isAuth from "../middlewares/isAuth.js";
import { PassportController } from "../controllers/passportController.js";
import { MongoDAO } from "../model/mongoDAO.js";
import bCrypt from 'bcrypt'

/* -------------PASSPORT-------------- */
passport.use('register', new LocalStrategy({
    passReqToCallback:true
}, async (req,username,password, done) => {
    const {mail} = req.body
    const userdb = await MongoDAO.getUser(username, 'users')
    if (userdb ==! null || userdb ==! undefined) {
        return done('already registered')
    }
    const newUser = {
        username: username,
        mail: mail,
        password: createHash(password)
    }
    await MongoDAO.save('users', newUser)
    const user = await MongoDAO.getUser(username, 'users')
    return done(null, user)
}));

passport.use('login', new LocalStrategy(async (username,password,done) => {
    const user = await MongoDAO.getUser(username, 'users')
    if (!user) {
        return done(null, false)
    }
    const userPws = user.password
    if(!isValidPassword(userPws, password)){
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
    MongoDAO.models['users'].findById(id, done);
});

const passportRouter = Router()

passportRouter.get("/", isAuth, PassportController.getHome.bind(PassportController))

// REGISTER
passportRouter.get('/register',PassportController.getRegister.bind(PassportController))

passportRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

passportRouter.get('/failregister',PassportController.failRegister.bind(PassportController))

// LOGIN
passportRouter.get('/login', PassportController.getlogin.bind(PassportController))

passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))

passportRouter.get('/faillogin',PassportController.failLogin.bind(PassportController))

// LOGOUT
passportRouter.get('/logout', PassportController.getLogout.bind(PassportController))

export default passportRouter;