import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavoriteService {
  constructor(private dbService: DbService) {}

  getFavorites() {
    return this.dbService.getDataBase().favorites;
  }

  addFavoriteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = this.dbService
      .getDataBase()
      .tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        "Track dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.dbService.getDataBase().favorites.tracks.push(track);
  }

  deleteFavoriteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = this.dbService
      .getDataBase()
      .favorites.tracks.find((track) => track.id === id);

    if (!isExists) {
      throw new HttpException(
        "Track dosn't exists in favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    this.dbService.getDataBase().favorites.tracks = this.dbService
      .getDataBase()
      .favorites.tracks.filter((track) => track.id !== id);
    return;
  }

  addFavoriteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = this.dbService
      .getDataBase()
      .albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        "Track dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.dbService.getDataBase().favorites.albums.push(album);
  }

  deleteFavoriteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = this.dbService
      .getDataBase()
      .favorites.albums.find((album) => album.id === id);

    if (!isExists) {
      throw new HttpException(
        "Track dosn't exists in favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    this.dbService.getDataBase().favorites.albums = this.dbService
      .getDataBase()
      .favorites.albums.filter((album) => album.id !== id);
    return;
  }

  addFavoriteArtist(id: string) {
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
      throw new HttpException(
        "Track dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.dbService.getDataBase().favorites.artists.push(artist);
  }

  deleteFavoriteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = this.dbService
      .getDataBase()
      .favorites.artists.find((artist) => artist.id === id);

    if (!isExists) {
      throw new HttpException(
        "Track dosn't exists in favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    this.dbService.getDataBase().favorites.artists = this.dbService
      .getDataBase()
      .favorites.artists.filter((artist) => artist.id !== id);
    return;
  }
}
