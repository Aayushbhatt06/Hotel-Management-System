const { signupValidation,LoginValidation} = require('../Middlewares/AuthRestValidation.js');
const {signup,login} = require('../Controllers/AuthRestController.js')
const check = require('../Controllers/check.js')
const router = require('express').Router();



router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)
router.get('/check',LoginValidation,check)

module.exports = router;