import { EntityRepository, Repository} from 'typeorm';
import {UserTypes} from '../entity/UserTypes';


@EntityRepository(UserTypes)
export class UserTypeRepository extends Repository<UserTypes> {}

