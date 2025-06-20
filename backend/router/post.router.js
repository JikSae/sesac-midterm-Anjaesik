const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma/index.js');
const authenticateToken = require('../middleware/authentication-middleware.js');
const { handleValidationResult, getPostValidator, putPostsValidator} = require("../middleware/validation-result-middleware.js");
const {checkPostOwner} = require("../middleware/authorization-middleware.js")
const PostController = require("../controllers/posts.controller.js")
const {signUpValidator, loginValidator, handleValitionResult} = require("../middleware/validation-result-middleware.js");


router.post('/todos',

authenticateToken ,
PostsValidator,
handleValidationResult,
postController.createPost

)

router.get('/todos',
authenticateToken,
putPostsValidator,
handleValidationResult,
checkPostOwner,
async (req, res, next) => {
  const { postId } = req.params;
  const {title, content} = req.body;
  const updatePost = await prisma.post.update({
    where : {postId : +postId},
    data : {
      title,
      content
    }
  })
  return res.status(200).json({
    message : "게시글이 조회되었습니다.",
    data : updatePost
});
}
)

module.exports = router;