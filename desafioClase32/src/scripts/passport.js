import passport from "passport";
import  {Strategy as LocalStrategy} from 'passport-local';
import { MongoDAO } from "../model/mongoDAO.js";
import bCrypt from 'bcrypt'
import User from "../model/usersDAO.js";

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
    User.userModel.findById(id, done);
});