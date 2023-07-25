import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  getTracks() {
    return this.dbService.getDataBase().tracks;
  }

  getTrack(id: string) {
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
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }

    return track;
  }

  createTrack(body: CreateTrackDto) {
    const newTrack = {
      artistId: null,
      albumId: null,
      ...body,
      id: uuidv4(),
    };

    this.dbService.getDataBase().tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, body: CreateTrackDto) {
    let track = this.dbService
      .getDataBase()
      .tracks.find((tracks) => tracks.id === id);

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!track) {
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }

    track = { ...track, ...body };

    return track;
  }

  deleteTrack(id: string) {
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
      throw new HttpException("Track dosn't exists", HttpStatus.NOT_FOUND);
    }

    this.dbService.getDataBase().tracks = this.dbService
      .getDataBase()
      .tracks.filter((track) => track.id !== id);

    const isFavorite = this.dbService
      .getDataBase()
      .favorites.tracks.find((track) => track.id === id);

    if (isFavorite) {
      this.dbService.getDataBase().favorites.tracks = this.dbService
        .getDataBase()
        .favorites.tracks.filter((track) => track.id !== id);
    }
    return;
  }
}
