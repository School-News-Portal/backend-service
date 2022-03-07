import { EntityRepository, Repository } from "typeorm";
import { Posts } from '../entity/Posts';
@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {

}