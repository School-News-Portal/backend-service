import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Posts} from './Posts';


@Entity({ name: "categories"})
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'varchar',
        length:30
    })
    name: string;

    @Column({
        type:'varchar'
    })
    description: string;


    @OneToMany(()=> Posts, post=> post.id)
    posts: Posts[];

}