import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Image {

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     image:string;

     @Column({ nullable: true })
     imageUrl: string;

     @Column({ nullable: true })
     imageKey: string;

     @Column({ nullable: true })
     thumbnailImageUrl: string;

     @Column({ nullable: true })
     thumbnailImageKey: string;
}