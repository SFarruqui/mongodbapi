import * as mongoose from 'mongoose';

export const ActivitiesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    activities: { type: [String], required: true },
    schoolEvents: { type: [String], required: true },
});

export interface Activities extends mongoose.Document {
    id: string;
    name: string;
    activities: string[],
    schoolEvents: string[],
}

