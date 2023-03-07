import logger from "../scripts/logger.js";

export class PassportController{
    static getHome(req,res){res.render('table', {userName:req.user.username})}

    static getRegister(_,res){res.render('register')}

    static getlogin(_,res){res.render('login')}
    
    static failRegister(_,res){
        logger.error(`Error en registro de usuario`)
        res.render('register-error')
    }

    static failLogin(_,res){
        logger.error(`Error en login de usuario`)
        res.render('login-error')
    }

    static getLogout(req,res, next){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    }
}
