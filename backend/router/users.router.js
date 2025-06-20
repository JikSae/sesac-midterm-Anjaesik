const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();
const SECRET_KEY = "sessac"
const authenticateToken = require("../middleware/authentication-middleware")
const prisma = require('../utils/prisma/index.js');
const bcrypt = require("bcrypt")
const { signUpValidator, loginValidator, handleValidationResult } = require('../middleware/validation-result-middleware.js')
const authController = require("../controllers/auth.controller.js")

router.post('/auth/signup',
signUpValidator,
handleValidationResult,
authController.signUp
)

router.post('/auth/login', loginValidator, handleValidationResult, async (req, res, next) => {
const { email, password } = req.body;


const user = await prisma.users.findFirst({
where: { email }
})

if (!user) {
return next(new Error("LoggedInFailed"));
}


const verifyPassword = await bcrypt.compare(password, users.password)
if(!verifyPassword){
return next(new Error("PasswordError"))
}

const token = jwt.sign({
userId: user.userId
}, SECRET_KEY, {
expiresIn: "12h"
})
return res.status(200).send({
token
})
})

router.get("/user", authenticateToken, (req, res, next) => {
console.log(req.user)
next(new Error("ExistEmail"));

})
module.exports = router;