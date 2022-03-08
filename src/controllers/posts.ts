import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { getRepository} from 'typeorm';
import {Posts} from '../entity/Posts';
import { SUCCESS_RESPONSE, ERROR_RESPONSE, SUCCESS_RESPONSE_WITH_TOKEN } from '../utils/common.utils';

dotenv.config()

export const create = async (req: Request, res: Response) => {
    const { type, category , datePostedOn, title, content, dateUpdatedOn, status, author } = req.body;

    const postRepository = await getRepository(Posts);
    const existingPost = await postRepository.findOne({title:title, category: category});
    if(existingPost){
         return res.status(400).send(ERROR_RESPONSE(`Post with title ${title} and category ${category} already exists`));
    }

    const post = await postRepository.create({
        type,
        category,
        datePostedOn: new Date(datePostedOn),
        dateUpdatedOn: new Date(dateUpdatedOn),
        title,
        content,
        status,
        author,
    })

    const savedPost = await postRepository.save(post);
    return res.status(201).send(SUCCESS_RESPONSE("Post created successfully", savedPost));

}


export async function single(req: Request, res: Response){
  const post = await getOne(req.params.id);
  if(post === false){
      return res.status(400).send(ERROR_RESPONSE("Post not found"))
  }
  return res.status(200).send(SUCCESS_RESPONSE("", post));
}


export async function all(req: Request, res: Response){
   const postRepository = getRepository(Posts);
   const posts = await postRepository.find();
   return res.status(200).send(SUCCESS_RESPONSE("", posts))
}


export async function update(req: Request, res: Response){
    const { type, category , datePostedOn, title, content, dateUpdatedOn, status, author } = req.body;
     const postRepository = getRepository(Posts);
     const post = await getOne(req.params.id);
      if(post === false){
      return res.status(400).send(ERROR_RESPONSE("Post not found"))
  }
  await postRepository.update(Number(req.params.id),{
        type,
        category,
        datePostedOn: new Date(datePostedOn),
        dateUpdatedOn: new Date(dateUpdatedOn),
        title,
        content,
        status,
        author
    })
  const updatedPost = await postRepository.find({ id: Number(req.params.id)})
  return res.status(200).send(SUCCESS_RESPONSE("Post updated successfully", updatedPost));
}

export async function deletePost(req: Request, res: Response){
     const postRepository = getRepository(Posts);
     const post = await getOne(req.params.id);
      if(post === false){
      return res.status(400).send(ERROR_RESPONSE("Post not found"));
    }
    await postRepository.remove(post);
    return res.send(`Post with id ${req.params.id} deleted successfully`);

}

export const getOne = async(id)=>{
const postRepository = getRepository(Posts);
   const post = await postRepository.find({
       id: Number(id)
   })
    if(!post){
        return false;
    }
    return post;
    
}