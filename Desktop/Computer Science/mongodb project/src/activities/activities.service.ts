import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities } from './activities.model';

interface UpdateActivitiesDto { 
  name?: string;
  activities?: string[];
  schoolEvents?: string[];
}

@Injectable()
export class ActivitiesService {
  constructor(@InjectModel('Activities') private readonly activitiesModel: Model<Activities>) {}

  // Create
  async insertActivities(createActivitiesDto: UpdateActivitiesDto) { 
    const newActivities = new this.activitiesModel(createActivitiesDto); 
    const result = await newActivities.save();
    return result.id as string; 
  }

  // Retreive 
  async getAllActivities() {
    const activities = await this.activitiesModel.find().exec();
    return activities as Activities[]; 
  }

  async getActivitiesById(activitiesId: string) {
    const activities = await this.findActivities(activitiesId);
    return activities; 
  }

  // Update
  async updateActivities(activitiesId: string, updateActivitiesDto: UpdateActivitiesDto) {
    const existingActivities = await this.findActivities(activitiesId);

    for (const field in updateActivitiesDto) { 
      if (updateActivitiesDto[field]) {
        existingActivities[field] = updateActivitiesDto[field];
      }
    }
    await existingActivities.save(); 
  }

  //Delete
  async deleteActivities(activitiesId: string) {
    const result = await this.activitiesModel.deleteOne({ _id: activitiesId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find activities.');
    }
  }

  private async findActivities(id: string): Promise<Activities> {
    try {
      const activities = await this.activitiesModel.findById(id).exec();
  
      if (!activities) {
        throw new NotFoundException('Could not find activities.');
      }
  
      return activities;
    } catch (error) {
      throw new NotFoundException('Could not find activities.');
    }
  }
}