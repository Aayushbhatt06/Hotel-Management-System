const { signupValidation,LoginValidation} = require('../Middlewares/AuthRestValidation.js');
const {signup,login} = require('../Controllers/AuthRestController.js')

const router = require('express').Router();



router.post('/signup',signupValidation,signup)
router.post('/login',LoginValidation,login)

module.exports = router;