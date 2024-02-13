import { Exclude } from 'class-transformer';
import { Base } from '../communBase/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';

@Entity('users')
export class User extends Base {
  @Column({ type: 'varchar', length: 300, default: '' })
  firstName?: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Magazine, (magazine) => magazine.owner)
  magazines: Magazine[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.user)
  subscribes: Subscribe[];
}
