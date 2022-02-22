import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { User} from '../entity/User';
import { UserRepository} from '../repository/UserRepository';
import getRepository from 'typeorm';

const SALT_ROUND = Number(process.env.BCRYPT_SALT_AROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { complementaryName, displayName, type, username, password } = req.body;

  
}

export const login = async (req: Request, res: Response) => {

}