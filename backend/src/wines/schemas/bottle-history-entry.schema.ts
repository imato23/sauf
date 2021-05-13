import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class BottleHistoryEntry extends Document {
    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, enum: ['bottlesRemoved', 'bottlesAdded'] })
    action: string;

    @Prop({ required: true })
    bottleCount: number;
}

export const BottleHistoryEntySchema = SchemaFactory.createForClass(BottleHistoryEntry);