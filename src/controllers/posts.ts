import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { Author} from '../entity/Author';
import { UserTypes } from '../entity/UserTypes';
import { getRepository} from 'typeorm';
import { Category } from '../entity/Category';
import {Posts} from '../entity/Posts';
import { SUCCESS_RESPONSE, ERROR_RESPONSE, SUCCESS_RESPONSE_WITH_TOKEN } from '../utils/common.utils';

dotenv.config()

export const create = async (req: Request, res: Response) => {
    const { type, category , datePostedOn, title, content, dateUpdatedOn, status, author } = req.body;
    

    const userRepository = await getRepository(UserTypes);
    const userType = await userRepository.findOne({ id: Number(type) });
    if(!userType) {
        return res.status(400).send(ERROR_RESPONSE("User type not found"));
    }


    const categoryRepository = await getRepository(Category);
    const postCategory = await categoryRepository.findOne({ id: Number(category) });
    if(!postCategory) {
         return res.status(400).send(ERROR_RESPONSE("Category not found"));
    }


    const authorRepository = await getRepository(Author);
    const postAuthor = await authorRepository.findOne({ id: Number(author) });
    if(!postAuthor) {
         return res.status(400).send(ERROR_RESPONSE("Author not found"));
    }

    const postRepository = await getRepository(Posts);
    const existingPost = await postRepository.findOne({title});
    if(existingPost){
         return res.status(400).send(ERROR_RESPONSE(`Post with tiles ${title} already exists`));
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