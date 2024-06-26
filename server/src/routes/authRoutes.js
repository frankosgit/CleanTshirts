const express = require('express')
const AuthController = require('../controllers/authControllers')

const router = express.Router()

const authController = new AuthController()

router.post("/create", authController.createUser)
router.post("/login", authController.logIn)
router.get("/logout", authController.logout)
router.get("/authCheck", authController.authCheck)
module.exports = router