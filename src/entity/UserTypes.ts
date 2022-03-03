import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity({ name: "user-types"})

export class UserTypes{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        unique: true,
        nullable: false
    })
    name: string;
}