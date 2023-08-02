import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async getTracks() {
    return await this.dbService.track.findMany();
  }

  async getTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.dbService.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async createTrack(body: CreateTrackDto) {
    const newTrack = {
      artistId: null,
      albumId: null,
      ...body,
      id: uuidv4(),
    };

    const responce = await this.dbService.track.create({
      data: { ...newTrack },
    });
    return responce;
  }

  async updateTrack(id: string, body: CreateTrackDto) {
    const track = await this.dbService.track.findFirst({ where: { id } });

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!track) {
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }
    const responce = await this.dbService.track.update({
      where: { id },
      data: { ...track, ...body },
    });

    return responce;
  }

  async deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.dbService.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }

    await this.dbService.track.delete({ where: { id } });

    const isFavorite = await this.dbService.track.findFirst({
      where: { id, isFavorite: true },
    });

    if (isFavorite) {
      await this.dbService.track.update({
        where: { id },
        data: { isFavorite: false },
      });
    }
    return;
  }
}
