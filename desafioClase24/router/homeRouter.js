import { Router } from "express";

const homeRouter = Router()

homeRouter.get("/", (req, res) => {
    res.send('Servidor express ok!')
});
homeRouter.get('/login', (req, res) =>{
    if (req.session?.user) {
        res.render('login', {userName: req.session.user});
    } else {
        res.render('form')
    }
});

homeRouter.post('/login', async  (req,res) => {
    req.session.user = req.body.userName;
    res.redirect('/login')
    
});

homeRouter.get("/logout", (req,res)=>{
    res.render('logout', {userName: req.session.user})
});
homeRouter.post('/logout', (req, res) =>{
    req.session.destroy(err => {
        if (err) {
            res.send({status: 'Logout ERROR', body: err })
        } else {
            console.log('Logout ok!')
            res.redirect('/logout')
        }
    })
});

export default homeRouter;