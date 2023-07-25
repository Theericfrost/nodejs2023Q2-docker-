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
import { ArtistService } from './artist.service';
import { CreateArtist } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  createArtist(@Body() body: CreateArtist) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() body: CreateArtist) {
    return this.artistService.updateArtist(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
