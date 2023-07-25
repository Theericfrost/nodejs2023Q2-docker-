import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  id: string;

  name: string;

  grammy: boolean;
}

export class CreateArtist {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
