import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { User} from '../entity/User';
import { UserRepository} from '../repository/UserRepository';
import {getCustomRepository} from 'typeorm';
import * as bcrypt from 'bcryptjs';

const SALT_ROUND = Number(process.env.BCRYPT_SALT_AROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { complementaryName, displayName, type, username, password } = req.body;
  const userRepository = getCustomRepository(UserRepository);
  const existingUser = await userRepository.findByNameAndType(type, username);
  if(existingUser){
    res.status(400).send({success: false, message: `User with type ${type}, username ${username} already exists`})
  }
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hashPassword = await bcrypt.hast(password, salt);
  const user = await userRepository.create({
    complementaryName,
    displayName,
    type,
    username,
    password: hashPassword,
  });
  await userRepository.save(user);
  res.status(201).send({success:true, message:"User created successfully", data: user})



}


export const login = async (req: Request, res: Response) => {

}