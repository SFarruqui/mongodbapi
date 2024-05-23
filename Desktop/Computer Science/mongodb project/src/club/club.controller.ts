import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClubService } from './club.service';

// Source for data: https://docs.google.com/spreadsheets/d/1dMqvtHYY_nZcw746BBYehono5Q_30C2eokWlDdjJHDA/edit?pli=1#gid=1088462603
// note that some clubs have 2024-25 co-heads, while majority has 2023-24 co-heads

@Controller('clubs')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Post()
    async addClub(@Body() createClubDto: any) {
        console.log("hi");
        const generatedId = await this.clubService.insertClub(createClubDto);
        return { id: generatedId };
    }

    @Get()
    async getAllClubs() {
        return await this.clubService.getAllClubs();
    }

    @Get(':id')
    async getClubById(@Param('id') clubId: string) {
        return await this.clubService.getClubById(clubId);
    }

    @Patch(':id')
    async updateClub(@Param('id') clubId: string, @Body() updateClubDto: any) {
        await this.clubService.updateClub(clubId, updateClubDto);
        return null;
    }

    @Delete(':id')
    async deleteClub(@Param('id') clubId: string) {
        await this.clubService.deleteClub(clubId);
        return null;
    }
}
