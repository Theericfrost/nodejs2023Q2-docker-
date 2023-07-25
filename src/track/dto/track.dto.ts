import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TrackDto {
  id: string;

  name: string;

  artistId: string | null;
  albumId: string | null;

  duration: number;
}

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;
}
