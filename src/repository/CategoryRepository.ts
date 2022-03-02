import { EntityRepository, Repository } from "typeorm";
import { Category} from '../entity/Category';
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    findCategoryName( name: string){
        return this.findOne({ name });
    }

    findById(id:number){
        return this.findOne({id})
    }

    findByIdAndDelete(id:number){
        return this.delete(id)
    }

    findByIdAndUpdate(id:number,data,{new:boolean}){
        return this.update(id,data)
            }
   
}