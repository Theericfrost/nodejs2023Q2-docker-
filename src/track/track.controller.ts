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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() body: CreateTrackDto) {
    return this.trackService.updateTrack(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
