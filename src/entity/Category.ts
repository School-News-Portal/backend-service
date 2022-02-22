import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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

}