import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    async addLocation(@Body() createLocationDto: any) {
        console.log("hi");
        const generatedId = await this.locationService.insertLocation(createLocationDto);
        return { id: generatedId };
    }

    @Get()
    async getAllLocations() {
        return await this.locationService.getAllLocations();
    }

    @Get(':id')
    async getLocationById(@Param('id') locationId: string) {
        return await this.locationService.getLocationById(locationId);
    }

    @Patch(':id')
    async updateLocation(@Param('id') locationId: string, @Body() updateLocationDto: any) {
        await this.locationService.updateLocation(locationId, updateLocationDto);
        return null;
    }

    @Delete(':id')
    async deleteLocation(@Param('id') locationId: string) {
        await this.locationService.deleteLocation(locationId);
        return null;
    }
}
