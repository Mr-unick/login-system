const Express=require('express')
const router= new Express.Router();
const { signup, login} = require('./controller')


//signup router
router.post('/signup',signup)    


//login router
router.post('/login',login)   

module.exports={router}