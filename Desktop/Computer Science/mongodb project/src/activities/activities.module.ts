import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivitiesSchema } from './activities.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Activities', schema: ActivitiesSchema }])
    ],
    controllers: [ActivitiesController],
    providers: [ActivitiesService]
})
export class ActivitiesModule {}
