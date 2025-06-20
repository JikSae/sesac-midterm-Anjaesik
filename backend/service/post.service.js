const postsRepository = require("../repositories/posts.repository");

class PostService{
  async createPost({userId, title, content}){
    return await postsRepository.createPost({userId, title,content})
  }
    async getAllPosts(){
    return await postsRepository.findAllPosts()
  } 
  
    async getPostById(postId){
    return await postsRepository.findPostById(PostId)
  }
   
     async updatePost(postId, title, content){
    return await postsRepository.updatePost(postId,{title, content});
  }
    
      async deletePost(postId, title, content){
    return await postsRepository.deletePost(postId);
  }
}

module.exports = new PostService();