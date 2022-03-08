import { EntityRepository, Repository } from "typeorm";
import { User} from '../entity/User';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // findByNameAndType(type: number, username: string){
    //     return this.findOne({ type, username });
    // }
}