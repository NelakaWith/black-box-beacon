import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('pulses')
export class Pulse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  contentEncrypted: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: any;

  @Column({ type: 'text', nullable: true })
  aiEchoResponse: string;
}
