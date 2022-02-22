    import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
    export enum EUserTypes {
        AUTHOR = "AUTHOR",
        ADMIN = "ADMIN",
        READER = "READER"
    }


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
            type:"enum",
            enum: EUserTypes
        })
        type: EUserTypes

        @Column({
            type: "varchar",
            length: 30,
            unique: true
        })
        username: string;

        @Column({
            type: "varchar"
        })
        password: string;
    }