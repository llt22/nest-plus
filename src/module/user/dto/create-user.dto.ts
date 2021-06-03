import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsOptional()
  readonly nickname: string = 'Jack';

  @IsNotEmpty()
  readonly password: string;
}
