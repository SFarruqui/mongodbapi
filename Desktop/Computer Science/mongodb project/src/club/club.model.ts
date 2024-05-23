import * as mongoose from 'mongoose';

export const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coHeads: { type: [String], required: true },
    clubBlock: { type: Number, required: true },
    facultySponsor: { type: String, required: true }
});

export interface Club extends mongoose.Document {
    id: string;
    name: string;
    coHeads: string[];
    clubBlock: number;
    facultySponsor: string;
}


