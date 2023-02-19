import { Router } from "express";
import isAuth from "../middlewares/passport.js";
import passport from "passport";
import { PassportController } from "../controllers/passportController.js";

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