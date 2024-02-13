import { Base } from 'src/communBase/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Magazine } from 'src/magazine/entities/magazine.entity';

@Entity('subscribes')
export class Subscribe extends Base {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'pending', 'cancelled'],
    default: 'active',
  })
  status: string;

  @ManyToOne(() => User, (user) => user.subscribes)
  user: User;

  @ManyToOne(() => Magazine, (magazine) => magazine.subscribes)
  magazine: Magazine;

  // Define a property to represent the subscriptions of the magazine
  @OneToMany(() => Subscribe, (subscribe) => subscribe.magazine)
  magazineSubscriptions: Subscribe[];
}
