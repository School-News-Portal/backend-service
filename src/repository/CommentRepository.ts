import { EntityRepository, Repository } from "typeorm";
import { Comments } from '../entity/Comments';
@EntityRepository(Comments)
export class PostsRepository extends Repository<Comments> {

}