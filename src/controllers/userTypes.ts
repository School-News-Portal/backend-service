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
    const save = await userTypeRepository.save(type);
    return res.status(201).send(SUCCESS_RESPONSE("User type created successfully"));
}

export async function single(){

}

export async function all(){

}

export async function update(){

}

export async function remove(){

}

