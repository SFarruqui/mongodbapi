import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post()
    async addActivities(@Body() createActivitiesDto: any) {
        console.log("hi");
        const generatedId = await this.activitiesService.insertActivities(createActivitiesDto);
        return { id: generatedId };
    }

    @Get()
    async getAllActivities() {
        return await this.activitiesService.getAllActivities();
    }

    @Get(':id')
    async getActivitiesById(@Param('id') activitiesId: string) {
        return await this.activitiesService.getActivitiesById(activitiesId);
    }

    @Patch(':id')
    async updateActivities(@Param('id') activitiesId: string, @Body() updateActivitiesDto: any) {
        await this.activitiesService.updateActivities(activitiesId, updateActivitiesDto);
        return null;
    }

    @Delete(':id')
    async deleteActivities(@Param('id') activitiesId: string) {
        await this.activitiesService.deleteActivities(activitiesId);
        return null;
    }
}
