import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Libellé du todo',
    example: 'Acheter du pain',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  todo: string;

  @ApiPropertyOptional({
    description: 'Indique si le todo est terminé',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  complete?: boolean;
}
