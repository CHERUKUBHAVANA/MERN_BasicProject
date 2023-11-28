const express = require('express')
const { signup, accountActivation, signin } = require('../controllers/auth')
const {userSignupvalidator, userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

const router = express.Router()

// router.get('/signup', signup)
router.post('/signup',userSignupvalidator, runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', userSigninValidator, runValidation, signin)
module.exports = router // {}