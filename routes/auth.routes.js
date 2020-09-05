const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/register').post(authController.registerUser)

router.route('/login').post(authController.loginUser)

router.route('/refresh').post(authController.renewToken)

module.exports = router
