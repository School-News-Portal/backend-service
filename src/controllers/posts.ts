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
    

    const userTypeRepository = await getRepository(UserTypes);
    const userType = await userTypeRepository.findOne({ id: Number(type) });
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
         return res.status(400).send(ERROR_RESPONSE(`Post with tiles ${existingPost.title} already exists`));
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