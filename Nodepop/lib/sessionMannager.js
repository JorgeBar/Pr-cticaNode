import session from 'express-session'
import MongoStore from'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2 
//middleware para gestionar sesiones
export const middleware = session({
    name:'nodepop-session',
    secret: 'dsfhjsadfljsdflksdaj',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    //las sesiones se guardan en MongoDB
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/NodePop'
    })
})

export function useSessionInViews(req, res, next){
    res.locals.session = req.session
    next()
}

export function isLoggedIn(req,res,next){
    if(!req.session.userId){
        res.redirect('/login')
        return
    }
    next()
}