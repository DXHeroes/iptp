import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Flow } from '../../flows/entity/flow.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
export class Action extends BasicEntity {
  @Column()
  tsTo: string;

  @Column()
  tsAmount: string;

  @Column()
  tsVS: string;

  @Column()
  tag: string;

  @Column()
  notification: boolean;

  @Column()
  priority: number;

  @ManyToOne(
    () => Flow,
    (flow: Flow) => flow.actions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  flow: Flow;

  @Index()
  @Column()
  flowId: string;
}
