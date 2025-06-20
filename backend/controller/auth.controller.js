const prisma = require("../utils/prisma/index")
const bcrypt = require("bcrypt")
const authService = require("../services/auth.service.js")

class AuthController{
 async signUp(req, res, next) {
  const {email, password, nickname} = req.body;
  const newUser = await authService.createUser(email, Password, nickname);
     return res.status(201).json({
      message: '회원가입이 성공적으로 완료',
      newUser
    });

}
async login(req, res,next){
try{
const {email,password} = req.body;
const token = await authService.login(email, password)

return res.status(200).json({token});
}catch(err){
next(err);
}
}
}

module.exports = new AuthController();

