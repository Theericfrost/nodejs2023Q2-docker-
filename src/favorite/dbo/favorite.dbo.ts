import { Album } from 'src/album/dto/album.dto';
import { Artist } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: TrackDto[];
}
