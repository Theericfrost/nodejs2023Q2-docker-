import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getFavorites() {
    return this.favoriteService.getFavorites();
  }

  @Post('track/:id')
  addFavoriteTrack(@Param('id') id: string) {
    return this.favoriteService.addFavoriteTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  deleteFavoriteTrack(@Param('id') id: string) {
    return this.favoriteService.deleteFavoriteTrack(id);
  }

  @Post('album/:id')
  addFavoriteAlbum(@Param('id') id: string) {
    return this.favoriteService.addFavoriteAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  deleteFavoriteAlbum(@Param('id') id: string) {
    return this.favoriteService.deleteFavoriteAlbum(id);
  }

  @Post('artist/:id')
  addFavoriteArtist(@Param('id') id: string) {
    return this.favoriteService.addFavoriteArtist(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  deleteFavoriteArtist(@Param('id') id: string) {
    return this.favoriteService.deleteFavoriteArtist(id);
  }
}
