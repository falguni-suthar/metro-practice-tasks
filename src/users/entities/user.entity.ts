import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     firstName: string;

     @Column()
     lastName: string;

     @Column()
     email: string;

     @Column()
     @Exclude()
     password: string;

     @Column({ nullable: true })
     mobile: string;

     @Column({ type: Boolean, default: true })
     isActive: boolean;

}

