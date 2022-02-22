import { EntityRepository, Repository } from "typeorm";
import { User,EUserTypes} from '../entity/User';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByNameAndType(type: EUserTypes, username: string){
        return this.findOne({ type, username });
    }
}