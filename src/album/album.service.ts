import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateAlbum } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}
  getAlbums() {
    return this.dbService.getDataBase().albums;
  }

  getAlbum(id: string) {
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
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    return album;
  }

  createAlbum(body: CreateAlbum) {
    const newAlbum = {
      artistId: null,
      ...body,
      id: uuidv4(),
    };

    this.dbService.getDataBase().albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, body: CreateAlbum) {
    let album = this.dbService
      .getDataBase()
      .albums.find((albums) => albums.id === id);

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!album) {
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    album = { ...album, ...body };

    return album;
  }

  deleteAlbum(id: string) {
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
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    this.dbService.getDataBase().albums = this.dbService
      .getDataBase()
      .albums.filter((album) => album.id !== id);

    const isFavorite = this.dbService
      .getDataBase()
      .favorites.albums.find((album) => album.id === id);

    if (isFavorite) {
      this.dbService.getDataBase().favorites.albums = this.dbService
        .getDataBase()
        .favorites.albums.filter((album) => album.id !== id);
    }

    this.dbService.getDataBase().tracks = this.dbService
      .getDataBase()
      .tracks.map((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
        return track;
      });

    return;
  }
}
