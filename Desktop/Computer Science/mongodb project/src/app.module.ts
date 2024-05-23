import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { LocationModule } from './location/location.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [ClubModule, LocationModule, ActivitiesModule, MongooseModule.forRoot('mongodb+srv://simonfarruqui25:$Simon2025@cluster0.mpiwokq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 