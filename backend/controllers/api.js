
const Post = require("../models/posts");
const fs = require("fs")

module.exports = class API {
    // lay tat ca bai viet
    static async fetchAllPost(req,res){
       try {
        const posts = await Post.find();
        res.status(200).json(posts);
       } catch (error) {
        res.status(404).json({messges: error.messges});
        
       }
}
        // lay bai viet theo id
static async fetchPostByID(req, res){
    
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({messges: error.messges});
        
    }
}
        // tao bai viet 
        static async createPost(req,res){
            const post = req.body;
            const imagename = req.file.filename;
            post.image = imagename;
            try {
                await Post.create(post);
                res.status(201).json({messge: ' tao bai viet thanh cong!'})
            } catch (error) {
                res.status(400).json({messge: error.messge})
                
            }
        }
     
        // update  bai viet
      static async updatePost(req,res){
        const id = req.params.id;
        let new_image = "";
        if(req.file){
            new_image = req.file.filename;
            try {
                fs.unlinkSync(".uploads/" + req.body.old_image);
            } catch (error) {
                console.log(error);
                
            }
        }else{
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;
        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({mesage:'Bai viet update thanh cong'});
        } catch (error) {
            res.status(404).json({messge: error.messge});
        }
    }

      // delete bai viet 
      static async deletePost(req,res){
        const id = req.params.id;
        try{
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/'+result.image)
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({mesage:'xoa bai viet thanh cong'});
        }catch(error){
            res.status(2404).json({mesage:error.mesage});
        }
    }
};