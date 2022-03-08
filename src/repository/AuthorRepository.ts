import { EntityRepository, Repository } from "typeorm";
import { Author } from '../entity/Author';
@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {

}