import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { ChunkController } from './chunk/chunk.controller';
import { ChunkService } from './chunk/chunk.service';

import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve(__dirname, "../.env") })

@Module({
  imports: [],
  controllers: [AppController, VideoController, ChunkController],
  providers: [AppService, VideoService, ChunkService],
})
export class AppModule {}
