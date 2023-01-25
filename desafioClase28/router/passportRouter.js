import { Router } from "express";
import isAuth from "../scripts/passport.js";
import passport from "passport";

const passportRouter = Router()

passportRouter.get("/", isAuth, (req, res) => {
    res.render('table', {userName:req.user.username})
})

// REGISTER
passportRouter.get('/register', (req, res) =>{
    res.render('register')
})
passportRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}))

passportRouter.get('/failregister', (req, res) =>{
    res.render('register-error')
})

// LOGIN
passportRouter.get('/login', (req, res) =>{
    res.render('login')
})
passportRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/'}))
passportRouter.get('/faillogin', (req,res) => {
    res.render('login-error')
})

// LOGOUT
passportRouter.get('/logout', (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
})

export default passportRouter;