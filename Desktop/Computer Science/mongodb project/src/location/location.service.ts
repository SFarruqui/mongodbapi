import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.model';

interface UpdateLocationDto { 
  name?: string;
  meetingLocation?: {
    building?: string;
    roomNumber?: string;
  }; 
  departmentHead?: string;
}

@Injectable()
export class LocationService {
  constructor(@InjectModel('Location') private readonly locationModel: Model<Location>) {}

  // Create
  async insertLocation(createLocationDto: UpdateLocationDto) { 
    const newLocation = new this.locationModel(createLocationDto); 
    const result = await newLocation.save();
    return result.id as string; 
  }

  // Retreive 
  async getAllLocations() {
    const locations = await this.locationModel.find().exec();
    return locations as Location[]; 
  }

  async getLocationById(locationId: string) {
    const location = await this.findLocation(locationId);
    return location; 
  }

  // Update
  async updateLocation(locationId: string, updateLocationDto: UpdateLocationDto) {
    const existingLocation = await this.findLocation(locationId);

    for (const field in updateLocationDto) { 
      if (updateLocationDto[field]) {
        existingLocation[field] = updateLocationDto[field];
      }
    }
    await existingLocation.save(); 
  }

  //Delete
  async deleteLocation(locationId: string) {
    const result = await this.locationModel.deleteOne({ _id: locationId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find location.');
    }
  }

  private async findLocation(id: string): Promise<Location> {
    try {
      const location = await this.locationModel.findById(id).exec();
  
      if (!location) {
        throw new NotFoundException('Could not find location.');
      }
  
      return location;
    } catch (error) {
      throw new NotFoundException('Could not find location.');
    }
  }
}