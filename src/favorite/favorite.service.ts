import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavoriteService {
  constructor(private dbService: DbService) {}

  async getFavorites() {
    const data = {
      artists: await this.dbService.artist.findMany({
        where: { isFavorite: true },
        select: {
          id: true,
          name: true,
          grammy: true,
          isFavorite: false,
        },
      }),
      albums: await this.dbService.album.findMany({
        where: { isFavorite: true },
        select: {
          id: true,
          name: true,
          year: true,
          artistId: true,
          isFavorite: false,
        },
      }),
      tracks: await this.dbService.track.findMany({
        where: { isFavorite: true },
        select: {
          id: true,
          name: true,
          artistId: true,
          albumId: true,
          duration: true,
          isFavorite: false,
        },
      }),
    };
    return data;
  }

  async addFavoriteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.dbService.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException(
        "Track dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.dbService.track.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteFavoriteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = await this.dbService.track.findFirst({ where: { id } });

    if (!isExists) {
      throw new HttpException(
        "Track dosn't exists in favorites collection",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dbService.track.update({
      where: { id },
      data: { isFavorite: false },
    });
    return;
  }

  async addFavoriteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.dbService.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException(
        "Album dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.dbService.album.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteFavoriteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = await this.dbService.album.findFirst({ where: { id } });

    if (!isExists) {
      throw new HttpException(
        "Album dosn't exists in favorites collection",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dbService.album.update({
      where: { id },
      data: { isFavorite: false },
    });
    return;
  }

  async addFavoriteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.dbService.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException(
        "Artist dosn't exists",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.dbService.artist.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  async deleteFavoriteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExists = await this.dbService.artist.findFirst({ where: { id } });

    if (!isExists) {
      throw new HttpException(
        "Artist dosn't exists in favorites collection",
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dbService.artist.update({
      where: { id },
      data: { isFavorite: false },
    });
    return;
  }
}
