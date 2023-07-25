import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateArtist } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}
  getArtists() {
    return this.dbService.getDataBase().artists;
  }

  getArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = this.dbService
      .getDataBase()
      .artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  createArtist(body: CreateArtist) {
    const newArtist = {
      ...body,
      id: uuidv4(),
    };

    this.dbService.getDataBase().artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, body: CreateArtist) {
    let artist = this.dbService
      .getDataBase()
      .artists.find((artists) => artists.id === id);

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    artist = { ...artist, ...body };

    return artist;
  }

  deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = this.dbService
      .getDataBase()
      .artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    this.dbService.getDataBase().artists = this.dbService
      .getDataBase()
      .artists.filter((artist) => artist.id !== id);

    const album = this.dbService
      .getDataBase()
      .albums.find((album) => album.artistId === id);

    if (album) {
      album.artistId = null;
    }

    const isFavorite = this.dbService
      .getDataBase()
      .favorites.artists.find((artist) => artist.id === id);

    if (isFavorite) {
      this.dbService.getDataBase().favorites.artists = this.dbService
        .getDataBase()
        .favorites.artists.filter((artist) => artist.id !== id);
    }

    this.dbService.getDataBase().tracks = this.dbService
      .getDataBase()
      .tracks.map((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
        return track;
      });

    return;
  }
}
