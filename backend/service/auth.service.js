const authRepository = require("../repositories/auth.repository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY || "sessac"

class AuthService{

  async signUp(email, password, nickname){
    //입력받은  이메일을 보고 데이터베이스에 값이 있는지 없는지 확인
    const existingUser = await authRepository.findByEmail(email);
    if(existingUser){
      throw new Error("ExistEmail");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword= await bcrypt.hash(
      password,
      salt
    )
	
    const newUser = await authRepository.createUser(email, bcryptPassword, nickname);
    return {userId : newUser.userId}
  }

async login(email, password){
const user = await authRepository.findUserByEmail(email);

if(!user){
throw new Error("UserNotFound");
}

const isPasswordCorrect = await bcypt.compare(password, userId)
if(!isPasswordCorrect){
throw new Error("PasswordError");
}

const token = jwt.sign(
{userId : user.userId},
SECRET_KEY,
{expiresIn: "12h"}
);
return token;
}

}

module.exports = new AuthService();