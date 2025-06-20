const prisma = require("../utils/prisma/index")

exports.CheckPostOwner = async (req, res, next) => {
const {postId} = req.params;
const userId = req.user;

// userId 랑 post의 userId가 동일한지 확인
const post = await prisma.post.findUnique({
  where : {postId: +postId}
})

if(!post){
  return next(new Error("PostNotFound"))
}
if(post.userId !== userId)
{
 return next(new Error("Forbidden")); 
}
res.locals.post = post; // req에는 인증 관련된것을 넣어둠 그래서 req가 아닌 res이다.
next();
}