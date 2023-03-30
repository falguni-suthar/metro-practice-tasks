import { Exclude } from 'class-transformer';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    address_line2: string;

    @Column({ nullable: true, default: null })
    city: string;

    @Column({ nullable: true, default: null })
    state: string;

    @Column({ nullable: true, default: null })
    country: string;

    @Column({ nullable: true, default: null })
    zipcode: string;

    @Column({ nullable: false })
    user_role: string;

    @CreateDateColumn({ nullable: false })
    created_date: Date;

    @CreateDateColumn({ nullable: true })
    @Exclude()
    updated_date: Date;

    @Column({ nullable: false, default: true })
    is_active: boolean;

    @Column({ nullable: true, default: null })
    department: string;

    @Column({ nullable: true, default: null })
    reset_token: string;

    @Column({ nullable: true, default: null })
    reset_token_expiration: Date;

    @Column({ nullable: true, default: null })
    property_group_id: number;

    @Column({ nullable: true, default: null })
    breezeway_user_id: number

    @Column({ nullable: true, default: null })
    profile_image: string

    @Column({ nullable: true, default: null })
    device_type: string

    @Column({ nullable: true, default: null })
    device_token: string

    @Column({ nullable: true, default: null })
    membership_plan: string

    @Column({ nullable: true, default: null })
    user_app_type: string

    @Column({ type: Date, nullable: true, default: null })
    walkthrough_notify_date: string;
    
    @Column({ type: Date, nullable: true, default: null })
    inspection_notify_date: string;

    @Column({ default: false })
    inspection_notification: boolean;

    @Column({ default: false })
    walkthrough_notification: boolean;
}

