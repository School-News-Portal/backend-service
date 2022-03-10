import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {Comments} from '../entity/Comments'
import { SUCCESS_RESPONSE } from "../utils/common.utils";

//create a comment
export const addComment = async(req:Request,res:Response)=>{
    const {post,username,comment,postingDate,status} = req.body
    const commentRepository = await getRepository(Comments);

    const posts = await commentRepository.create({
        username,
        comment,
        postingDate:new Date(postingDate),
        status,
        post

    })
    const savedComment = await commentRepository.save(posts)
    res.status(201).send(SUCCESS_RESPONSE("comment added successfully",savedComment))
    

}

//remove a comment



