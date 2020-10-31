import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Flow } from '../../flows/entity/flow.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
export class Action extends BasicEntity {
  @Column({ nullable: true})
  tsTo: string;

  @Column({ nullable: true})
  tsAmount: string;

  @Column({ nullable: true})
  tsVS: string;

  @Column({ nullable: true})
  tag: string;

  @Column({ nullable: true})
  notification: boolean;

  @Column({ nullable: true})
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
