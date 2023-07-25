import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  private db = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  getDataBase() {
    return this.db;
  }
}
