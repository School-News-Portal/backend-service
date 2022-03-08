import {PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import { Posts} from './Posts';

export enum AUTHOR_STATUS {
  DISABLED = 'DISABLED',
  ACTIVE = 'ACTIVE',
}


@Entity({ name: "author"})
export class Author{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
    })
    displayName: string;

    @Column({
        type: 'varchar',
    })
    email: string;

    @Column({
        type: 'enum',
        enum: AUTHOR_STATUS,
        default: AUTHOR_STATUS.ACTIVE
    })
    status: AUTHOR_STATUS;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
    })
    password: string;


    @OneToMany(()=> Posts, post => post.id)
    posts: Posts[] 
}