import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateAlbum } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}
  async getAlbums() {
    return await this.dbService.album.findMany();
  }

  async getAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.dbService.album.findFirst({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async createAlbum(body: CreateAlbum) {
    const newAlbum = {
      artistId: null,
      ...body,
      id: uuidv4(),
    };

    const responce = await this.dbService.album.create({
      data: {
        ...newAlbum,
      },
    });
    return responce;
  }

  async updateAlbum(id: string, body: CreateAlbum) {
    const album = await this.dbService.album.findFirst({ where: { id } });

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!album) {
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    const responce = await this.dbService.album.update({
      where: {
        id,
      },
      data: {
        ...album,
        ...body,
      },
    });

    return responce;
  }

  async deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const album = await this.dbService.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException("Album dosn't exists", HttpStatus.NOT_FOUND);
    }

    await this.dbService.album.delete({ where: { id } });
    const isFavorite = await this.dbService.album.findFirst({
      where: { id, isFavorite: true },
    });

    if (isFavorite) {
      await this.dbService.album.update({
        where: { id },
        data: { isFavorite: false },
      });
    }

    await this.dbService.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    return;
  }
}
