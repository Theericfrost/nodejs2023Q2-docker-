import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbum } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  getArtists() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  createArtist(@Body() body: CreateAlbum) {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() body: CreateAlbum) {
    return this.albumService.updateAlbum(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
