import { Request, Response} from 'express';
import * as dotenv from 'dotenv';
import { getRepository} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Author } from '../entity/Author';
import { SUCCESS_RESPONSE, ERROR_RESPONSE} from '../utils/common.utils';
dotenv.config()

const SALT_ROUND = Number(process.env.BCRYPT_SALT_AROUND);


export async function create(req: Request, res: Response){
    const authorRepository = getRepository(Author);
    const existingAuthor = await authorRepository.findOne({ username: req.body.username});
    if(existingAuthor){
        return res.status(400).send(ERROR_RESPONSE(`Author ${req.body.username} already exists`))
    }
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const author = await authorRepository.create({ 
        name: req.body.name,
        displayName: req.body.displayName,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
     });
    const saved = await authorRepository.save(author);
    return res.status(201).send(SUCCESS_RESPONSE("Author created successfully", saved));
}


export async function single(req: Request, res: Response){
  const author = await getOne(req.params.id);
  if(author === false){
      return res.status(400).send(ERROR_RESPONSE("Author not found"))
  }
  return res.status(200).send(SUCCESS_RESPONSE("", author));
}


export async function all(req: Request, res: Response){
   const authorRepository = getRepository(Author);
   const authors = await authorRepository.find();
   return res.status(200).send(SUCCESS_RESPONSE("", authors))
}

export async function update(req: Request, res: Response){

     const authorRepository = getRepository(Author);
     const author = await getOne(req.params.id);
      if(author === false){
      return res.status(400).send(ERROR_RESPONSE("Author not found"))
  }

     const salt = await bcrypt.genSalt(SALT_ROUND);
     const hashPassword = await bcrypt.hash(req.body.password, salt);
        await authorRepository.update(
            Number(req.params.id),
            { 
                name: req.body.name,
                displayName: req.body.displayName,
                email: req.body.email,
                username: req.body.username,
                password: hashPassword
            })
  const updatedAuthor = await authorRepository.find({ id: Number(req.params.id)})
  return res.status(200).send(SUCCESS_RESPONSE("", updatedAuthor));
}

export async function deleteAuthor(req: Request, res: Response){
     const authorRepository = getRepository(Author);
     const author = await getOne(req.params.id);
      if(author === false){
      return res.status(400).send(ERROR_RESPONSE("Author not found"));
    }
    await authorRepository.remove(author);
    return res.send(SUCCESS_RESPONSE(`Author with id ${req.params.id} deleted successfully`));

}

export const getOne = async(id)=>{
const authorRepository = getRepository(Author);
   const author = await authorRepository.find({
       id: Number(id)
   })
    if(!author){
        return false;
    }
    return author;
    
}


