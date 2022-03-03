import { Request, Response} from 'express';
import * as dotenv from 'dotenv';
import { UserTypeRepository} from '../repository/UserTypeRepository';
import { getRepository} from 'typeorm';
import { UserTypes } from '../entity/UserTypes';
import { SUCCESS_RESPONSE, ERROR_RESPONSE} from '../utils/common.utils';
import userTypes from '../routes/userTypes';
dotenv.config()

export async function create(req: Request, res: Response){
    const userTypeRepository = getRepository(UserTypes);
    const existingUserType = await userTypeRepository.findOne({ name: req.body.name });
    if(existingUserType){
        return res.status(400).send(ERROR_RESPONSE(`User type ${req.body.name} already exists`))
    }
    const type = await userTypeRepository.create({ name: req.body.name });
    const saved = await userTypeRepository.save(type);
    return res.status(201).send(SUCCESS_RESPONSE("User type created successfully", saved));
}

export async function single(req: Request, res: Response){
  const type = await getOne(req.params.id);
  if(type === false){
      return res.status(400).send(ERROR_RESPONSE("User type not found"))
  }
  return res.status(200).send(SUCCESS_RESPONSE("", type));
}




export async function all(req: Request, res: Response){
   const userTypeRepository = getRepository(UserTypes);
   const userTypes = await userTypeRepository.find();
   return res.status(200).send(SUCCESS_RESPONSE("", userTypes))
}

export async function update(req: Request, res: Response){
     const userTypeRepository = getRepository(UserTypes);
     const userType = await getOne(req.params.id);
      if(userType === false){
      return res.status(400).send(ERROR_RESPONSE("User type not found"))
  }
  await userTypeRepository.update(Number(req.params.id),{name:req.params.name})
  const updatedType = await userTypeRepository.find({ id: Number(req.params.id)})
  return res.status(200).send(SUCCESS_RESPONSE("", updatedType));
}

export async function deleteType(req: Request, res: Response){
     const userTypeRepository = getRepository(UserTypes);
     const userType = await getOne(req.params.id);
      if(userType === false){
      return res.status(400).send(ERROR_RESPONSE("User type not found"));
    }
    await userTypeRepository.remove(userType);
    return res.send(`User type with id ${req.params.id} deleted successfully`);

}


export const getOne = async(id)=>{
const userTypeRepository = getRepository(UserTypes);
   const type = await userTypeRepository.find({
       id: Number(id)
   })
    if(!type){
        return false;
    }
    return type;
    
}