const { signupValidation,LoginValidation} = require('../Middlewares/AuthValidation.js');
const {signup,login} = require('../Controllers/AuthController.js')

const router = require('express').Router();



router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)

module.exports = router;