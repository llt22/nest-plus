import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PagingBaseDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  readonly page: number = 0;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  readonly count: number = 10;
}
