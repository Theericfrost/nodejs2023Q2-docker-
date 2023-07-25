import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
