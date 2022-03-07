import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne} from "typeorm";
import { UserTypes } from "./UserTypes";


@Entity({ name: "posts"})

export class Posts{

    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne(()=> UserTypes)
    @JoinColumn()
    type: UserTypes;

}