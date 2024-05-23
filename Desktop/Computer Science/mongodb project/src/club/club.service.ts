import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club } from './club.model';

interface UpdateClubDto { 
  name?: string;
  coHeads?: string[];
  clubBlock?: number;
  facultySponsor?: string;
}

@Injectable()
export class ClubService {
  constructor(@InjectModel('Club') private readonly clubModel: Model<Club>) {}

  // Create
  async insertClub(createClubDto: UpdateClubDto) { 
    const newClub = new this.clubModel(createClubDto); 
    const result = await newClub.save();
    return result.id as string; 
  }

  // Retreive 
  async getAllClubs() {
    const clubs = await this.clubModel.find().exec();
    return clubs as Club[]; 
  }

  async getClubById(clubId: string) {
    const club = await this.findClub(clubId);
    return club; 
  }

  // Update
  async updateClub(clubId: string, updateClubDto: UpdateClubDto) {
    const existingClub = await this.findClub(clubId);

    for (const field in updateClubDto) { 
      if (updateClubDto[field]) {
        existingClub[field] = updateClubDto[field];
      }
    }
    await existingClub.save(); 
  }

  //Delete
  async deleteClub(clubId: string) {
    const result = await this.clubModel.deleteOne({ _id: clubId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find club.');
    }
  }

  private async findClub(id: string): Promise<Club> {
    try {
      const club = await this.clubModel.findById(id).exec();
  
      if (!club) {
        throw new NotFoundException('Could not find club.');
      }
  
      return club;
    } catch (error) {
      throw new NotFoundException('Could not find club.');
    }
  }
}