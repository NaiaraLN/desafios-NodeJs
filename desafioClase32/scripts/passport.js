import {USERNAME, PASSWORD} from "../config/config.js"
import passport from "passport";
import  {Strategy as LocalStrategy} from 'passport-local';
import User from '../utils/users.js'
import bCrypt from 'bcrypt'

const userDB = new User(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1ezwxyq.mongodb.net/ecommerce?retryWrites=true&w=majority`)

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
    userDB.model.findById(id, done);
});

/* ---AUTH--- */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

export default isAuth;