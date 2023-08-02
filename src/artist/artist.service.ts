import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateArtist } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}
  async getArtists() {
    return await this.dbService.artist.findMany();
  }

  async getArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.dbService.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async createArtist(body: CreateArtist) {
    const newArtist = {
      ...body,
      id: uuidv4(),
    };

    const response = await this.dbService.artist.create({
      data: {
        ...newArtist,
      },
    });
    return response;
  }

  async updateArtist(id: string, body: CreateArtist) {
    const artist = await this.dbService.artist.findFirst({ where: { id } });

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    const response = await this.dbService.artist.update({
      where: { id },
      data: { ...artist, ...body },
    });

    return response;
  }

  async deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.dbService.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException("Artist dosn't exists", HttpStatus.NOT_FOUND);
    }

    await this.dbService.artist.delete({ where: { id } });
    const album = await this.dbService.album.findFirst({
      where: { artistId: id },
    });

    if (album) {
      await this.dbService.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
    }

    const isFavorite = await this.dbService.artist.findFirst({
      where: { id, isFavorite: true },
    });

    if (isFavorite) {
      await this.dbService.artist.update({
        where: { id, isFavorite: true },
        data: { isFavorite: false },
      });
    }

    await this.dbService.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    return;
  }
}
