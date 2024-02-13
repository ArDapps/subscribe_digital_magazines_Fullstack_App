import { Base } from 'src/communBase/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('magazines')
export class Magazine extends Base {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monthlyPrice: number;
}
