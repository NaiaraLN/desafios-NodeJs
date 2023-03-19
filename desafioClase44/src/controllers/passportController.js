import logger from "../scripts/logger.js";

export class PassportController{
    static getHome(req,res){res.json({userName:req.user.username})}

    static getRegister(_,res){res.json({status:'register'})}

    static getlogin(_,res){res.json({status:'logged in'})}
    
    static failRegister(_,res){
        logger.error(`Error en registro de usuario`)
        res.json({error:'register-error'})
    }

    static failLogin(_,res){
        logger.error(`Error en login de usuario`)
        res.json({error:'login-error'})
    }

    static getLogout(req,res, next){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}
