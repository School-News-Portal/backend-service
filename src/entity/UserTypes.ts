import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import {Posts} from './Posts';


@Entity({ name: "user_types"})

export class UserTypes{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        nullable: false
    })
    name: string;

    @OneToMany(()=> Posts, post=>post.id)
    post: Posts[];

}