import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Album {
  id: string;

  name: string;

  year: number;

  artistId: string | null;
}

export class CreateAlbum {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: 2022;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
