import { Base } from '../../communBase/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/user.entity'; // Adjust the path to your User entity file
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';

@Entity('magazines')
export class Magazine extends Base {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monthlyPrice: number;

  @ManyToOne(() => User, (user) => user.magazines) // Many magazines can belong to one user
  owner: User;
  @OneToMany(() => Subscribe, (subscribe) => subscribe.magazine)
  subscribes: Subscribe[];
}
