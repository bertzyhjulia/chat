import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiPropertyOptional()
  admin_id?: number;
  @ApiProperty()
  is_individual: boolean;
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  logo?: string;
}

export class UpdateChatDto {
  @ApiPropertyOptional()
  admin_id?: number;
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  logo?: string;
}
