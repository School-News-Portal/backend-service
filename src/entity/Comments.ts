import { Entity, PrimaryGeneratedColumn, Column, JoinColumn,OneToMany, ManyToOne} from 'typeorm';
import {Posts} from './Posts';


export enum COMMENT_STATUS{
    APPROVED='APPROVED',
    NOT_APPROVED='NOT_APPROVED'
}

@Entity({ name: "tblcomments"})
export class Comments{

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(()=>Posts, post=>post.id)
    post:Posts;

    @Column({
        type:'varchar',
        length:30
    })
    username:string

    @Column({
        type:'varchar',
        length:30
    })

    comment: string;
    @Column({
        type:'date',
        nullable:true
    })

    postingDate:Date;

    @Column({
        type:'enum',
        enum:COMMENT_STATUS,
        default:COMMENT_STATUS.NOT_APPROVED
    })
    status:COMMENT_STATUS;
    
  
   

}