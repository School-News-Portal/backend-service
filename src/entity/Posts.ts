import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne,ManyToOne,OneToMany} from "typeorm";
import { UserTypes } from "./UserTypes";
import { Category} from './Category';
import { Author } from './Author';

export enum NEWS_STATUS {
  PUBLISHED = 'PUBLISHED',
  NOT_PUBLISHED = 'NOT_PUBLISHED',
}


@Entity({ name: "posts"})

export class Posts{

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(()=> UserTypes, type=> type.id)
    type: UserTypes;

    @ManyToOne(()=> Category, category=> category.id)
    category: Category;

    @Column({
        type: 'date',
        nullable: false
    })
    datePostedOn: Date;

    @Column({
        type: 'varchar'
    })
    title: string;

    @Column({
        type: 'varchar',
    })
    content: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    dateUpdatedOn: Date;

    @Column({
        type: 'enum',
        enum: NEWS_STATUS,
        default: NEWS_STATUS.NOT_PUBLISHED
    })
    status: NEWS_STATUS;

    @ManyToOne(()=> Author, author => author.id)
    @JoinColumn()
    author: Author;

}