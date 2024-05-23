import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    meetingLocation: {
        building: { type: String, required: true },
        roomNumber: { type: String, required: true }
    },
    departmentHead: { type: String, required: true }
});

export interface Location extends mongoose.Document {
    id: string;
    name: string;
    meetingLocation: {
        building: string;
        roomNumber: string;
    };
    departmentHead: string;
}
