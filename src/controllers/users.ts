import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { UserRepository} from '../repository/UserRepository';
import {getCustomRepository, getRepository} from 'typeorm';
import { UserTypes} from '../entity/UserTypes';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {User} from '../entity/User';
import { SUCCESS_RESPONSE, ERROR_RESPONSE, SUCCESS_RESPONSE_WITH_TOKEN } from '../utils/common.utils';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_AROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;



export const register = async (req: Request, res: Response) => {
  const { complementaryName, displayName, type, username, password } = req.body;
  const userTypeRepository = await getRepository(UserTypes);
  const userType = await userTypeRepository.findOne({ id: type});
  if(!userType){
    return res.status(400).send(ERROR_RESPONSE("User type not found"));
  }
  
  const userRepository = getRepository(User);
  const existingUser = await userRepository.findOne({ username: username});
  if(existingUser){
    return res.status(400).send(ERROR_RESPONSE(`User with username ${username} already exists`))
  }
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await userRepository.create({
    complementaryName,
    displayName,
    username,
    password: hashPassword,
    type,
  })
  await userRepository.save(user);
  return res.status(201).send(SUCCESS_RESPONSE("User created successfully",user))
  
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
   const userRepository = getRepository(User);
  const user = await userRepository.findOne({username:username});
  if(!user){
    res.status(404).send(ERROR_RESPONSE(`${username} not found`))
  }
  const isSuccess = await bcrypt.compare(password, user.password);
  if(isSuccess) {
    const payload = {
      id: user.id,
      username: user.username,
      complementaryName: user.complementaryName
    };
    const token = jwt.sign(payload, SECRET_KEY,{expiresIn: '12h'});
    res.status(200).send(SUCCESS_RESPONSE_WITH_TOKEN("Logged in successfully",user, token));
  }
  else{
    res.status(400).send(ERROR_RESPONSE("Invalid username or password"));
  }

}