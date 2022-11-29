import axios from "axios";
const url = "/api/post";

export default class API{

    // to get all the post fform the server
    static async getAllPost(){
        const res = await axios.get(url);
        return res.data;
    }
    //to get signle post by id
    static async getPostByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    //to inset post into database
    static async addPost(post){
        const res = await axios.post(url,post);
        return res.data;
    }
    //to update posst into database
    static async updatePost(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }
    static async deletePost(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
