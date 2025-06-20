const prisma = require("../utils/prisma/index")
class PostRepository {
  async createPost({userId, title, content}){
    return await prisma.post.create({
      data: {
        userId, title, content
      }
    })
  }
  async findAllPosts(){
  const posts = await prisma.Post.findMany({
        include: {
          User: {
            select: {
              userId: true,
              nickname: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  }
  
  async findPostById( ){
	return await prisma.post.findUnique({
	where: {postId},
	        include: {
          User: {
            select: {
              userId: true,
               nickname: true,
            }
          }
        },    
      });
  }
  
  async updatePost({postId, title, content}){
	return await prisma.post.update({
	where: {postId: +postId},
	data : {title, content},
  })
}

}
module.exports = new PostRepository();