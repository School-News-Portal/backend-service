import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'varchar',
        length:30
    })
    name: string;

    @Column()
    description: string;

}