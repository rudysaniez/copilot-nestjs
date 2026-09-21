import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class Todo {
  @ApiProperty({
    description: 'Identifiant technique du todo',
    example: 1,
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Libellé du todo',
    example: 'Acheter du pain',
    maxLength: 255,
    type: String,
  })
  @Column({ type: 'varchar', length: 255 })
  todo: string;

  @ApiProperty({
    description: 'Indique si le todo est terminé',
    example: false,
    type: Boolean,
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  complete: boolean;
}
