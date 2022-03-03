    import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
    import { UserTypes} from "./UserTypes";
  
    @Entity({ name: "users"})
    export class User{

        @PrimaryGeneratedColumn()
        id: number;

        @Column({
            type:"varchar",
            length:50,
            nullable:true
        })
        complementaryName: string;
        
        @Column({
            type:"varchar"
        })
        displayName: string;

        @Column({
            type: "varchar",
            length: 30,
            unique: true
        })
        username: string;

        @OneToOne(()=> UserTypes)
        @JoinColumn()
        type: UserTypes;

        @Column({
            type: "varchar"
        })
        password: string;
        
    }