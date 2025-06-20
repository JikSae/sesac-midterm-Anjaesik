const postsService = require("../services/posts.service");
const PostService = require("../services/posts.service")

class PostController{

//글 생성
async createPost(req, res, next){
try{
  const {title, content} =req.body;
  const userId = req.user;
  const newPost = await postsService.createPost({userId, title, content});
  return res.status(201).json({
    message : "게시글이 등록되었습니다.",
    data : newPost,
  });
  } catch(err){
  next(err);
  }
}

//모든 글 조회
async findAllPosts(req,res,next){
const posts = await postService.getAllPost();
return res.status(200).json({data: posts});
}

//특정 글 조회
async findPostById(req,res,next){
const {postId} = req.params;
const post = await postService.getPostById(+postId)
return res.status(200).json({data: post});
}

//글 수정
async updatePost(req,res,next){
const {postId} = req.params;
const {title, content} = req.body;
const updatePost = await postService.updatePost({
postId: +postId,
title,
content
})

return res.status(200).json({
message: "게시글이 수정되었습니다.",
data: updatedPost,});
}

}

module.exports = new PostController();