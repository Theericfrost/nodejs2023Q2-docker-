import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id: string;

  login: string;

  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
