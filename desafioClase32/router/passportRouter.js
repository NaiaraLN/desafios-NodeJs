import { Router } from "express";
import isAuth from "../scripts/passport.js";
import passport from "passport";
import logger from "../scripts/logger.js";

const passportRouter = Router()

passportRouter.get("/", isAuth, (req, res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render('table', {userName:req.user.username})
})

// REGISTER
passportRouter.get('/register', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render('register')
})
passportRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

passportRouter.get('/failregister', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    logger.error(`Error en registro de usuario`)
    res.render('register-error')
})

// LOGIN
passportRouter.get('/login', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    res.render('login')
})
passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))
passportRouter.get('/faillogin', (req,res) => {
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    logger.error(`Error en login de usuario`)
    res.render('login-error')
})

// LOGOUT
passportRouter.get('/logout', (req, res) =>{
    const { url, method } = req
    logger.info(`Ruta ${method} ${url} implementada`)
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

export default passportRouter;