import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BottleHistoryEntry } from './bottle-history-entry.schema';
import { StorageLocation } from './storage-location.schema';

@Schema()
export class VintageInfo extends Document {
    @Prop({ required: true })
    vintage: number;

    @Prop()
    price: number;

    @Prop()
    alcoholicStrength: number;

    @Prop()
    residualSugar: number;

    @Prop()
    tartaricAcid: number;

    @Prop()
    storageLocations: StorageLocation[]

    @Prop()
    history: BottleHistoryEntry[]
}

export const VintageInfoSchema = SchemaFactory.createForClass(VintageInfo);